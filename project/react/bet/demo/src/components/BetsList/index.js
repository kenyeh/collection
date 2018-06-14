import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce, findIndex, pullAllBy, takeWhile } from 'lodash';
import { connect } from 'react-redux';

import { insertToArrAndSortBy } from '../../utils';
import { socket } from '../../services';
import './betsList.css';
import TableHeader from './betsListTableHeader';
import TableBody from './betsListTableBody';

// let betsListData = [
//   // { uname: 'une', cashout: '-', wager: 123, cashedAt: 1.32, key: 'uname', profit: '-' },
// ];
// let betsListDataCashouted = [];

class BetsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      amount: 0
    };
    this.betsListData = this.props.betsListData;
    this.betsListDataCashouted = this.props.betsListDataCashouted;
  }

  static propTypes = {
    betsListData: PropTypes.array.isRequired,
    betsListDataCashouted: PropTypes.array.isRequired,
  }

  static defaultProps = {
    columns: [
      { title: '用户名', key: 'a', dataIndex: 'uname', width: '25%' },
      { title: '选择数值', key: 'b', dataIndex: 'cashout', width: '25%' },
      { title: '下注金额', key: 'c', dataIndex: 'wager', width: '25%' },
      { title: '利润', key: 'd', dataIndex: 'profit', width: '25%' },
    ],
  }

  debounceUpdate = debounce(() => {
    this.setState({
      data: this.betsListData.concat(this.betsListDataCashouted)
    });
  }, 300, { 'maxWait': 500 });

  componentWillReceiveProps({ betsListData, betsListDataCashouted }) {
    let amount = 0;
    this.betsListData = betsListData
      .sort((a, b) => a.wager > b.wager)
      .map(obj => {
        obj.key = obj.uname;
        obj.cashout = '-';
        obj.profit = '-';
        amount += parseFloat(obj.wager);
        return obj;
      });
    this.betsListDataCashouted = betsListDataCashouted
      .sort((a, b) => a.cashedAt < b.cashedAt)
      .map(obj => {
        obj.key = obj.uname;
        obj.cashout = obj.cashedAt;
        amount += parseFloat(obj.wager);
        this.calcProfit(obj);
        return obj;
      });
    this.setState({
      amount: amount
    })
  }

  componentDidMount() {
    this.observer();
  }

  componentWillUnmount() {
    this.betsListData = null;
    this.betsListDataCashouted = null;
  }

  observer() {
    socket.on('betPlaced', this.betPlaced.bind(this));
    socket.on('cashedOut', this.cashedOut.bind(this));
    socket.on('gameStarting', this.clearData.bind(this));
  }

  betPlaced(res) {
    const { uname, wager, payout } = res;
    const newBet = { uname, cashout: '-', wager: wager, cashedAt: payout, key: uname, profit: '-' };
    this.betsListData = insertToArrAndSortBy(this.betsListData, newBet, 'wager');
    this.setState(function (prevState) {
      const { amount } = prevState;
      return {
        amount: amount + wager,
      }
    });
    this.debounceUpdate();
  }

  cashedOut(res) {
    const [cashedAt, cashedOutArr = []] = res;
    this.checkPayout(cashedAt, this.betsListData); // 被动达到 cashout
    if (cashedOutArr.length) { // 主动 cashout
      cashedOutArr.map(this.cashedOutData.bind(this));
    }
    this.debounceUpdate();
  }

  checkPayout(cashedAt, oldData) {
    const cashoutedData = takeWhile(this.betsListData, function (o) { 
      const result = o.cashedAt <= cashedAt;
      result && (o.cashout = o.cashedAt);
      return result; 
    });
    pullAllBy(this.betsListData, cashoutedData, 'uname');
    this.betsListDataCashouted = insertToArrAndSortBy(this.betsListDataCashouted, cashoutedData, 'cashout');
  }

  cashedOutData([cashedAt, uname]) {
    const index = findIndex(this.betsListData, { uname });
    const cashoutData = this.betsListData.splice(index, 1);
    if (cashoutData.length){
      cashoutData[0].cashout = cashedAt;
      this.calcProfit(cashoutData);
    }
    this.betsListDataCashouted = insertToArrAndSortBy(this.betsListDataCashouted, cashoutData, 'cashout');
  }

  calcProfit(data) {
    if (data instanceof Array){
      data.forEach(obj => {
        obj.profit = obj.wager * (obj.cashout -1);
        obj.profit = obj.profit.toFixed(2);
      });
    } else if (typeof data === 'object'){
      data.profit = data.wager * (data.cashout - 1);
      data.profit = data.profit.toFixed(2);
    }
    return data;
  }

  clearData() {
    this.betsListData = [];
    this.betsListDataCashouted = [];
    this.setState({
      amount: 0,
      data: []
    });
  }

  render() {
    const { data, amount } = this.state;
    const { columns } = this.props;
    return (
      <div className="bets-list">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={data} />
        <div className="bets-list--summary">
          <div className="bets-list--count">投注人数：{data.length || 0}</div>
          <div className="bets-list--amount">投注金额：{amount}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ Common }) => ({
  betsListData: Common.playing,
  betsListDataCashouted: Common.cashOuts,
});

export default connect(mapStateToProps)(BetsList);
