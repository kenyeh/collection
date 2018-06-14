import React, { Component } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import { connect } from 'react-redux';
import { socket } from '../../services';

import './trends.css';

class Trends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: this.props.history || []
    }
    this.setRefs = this.setRefs.bind(this);
  }
  
  static propTypes = {
    history: PropTypes.array.isRequired,
  }

  componentDidMount() {
    this.buidChart();
    this.onUpdateHistory();
  }

  componentWillReceiveProps({ history }) {
    if (!history instanceof Array) { return false;}
    this.setState({
      history,
    }, function (){
      this.initHistory();
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  initHistory() {
    this.myChart.hideLoading();
    this.updateChart();
  }

  updateChart(history) {
    history = history || this.state.history;
    this.myChart.setOption({
      series: [
        {
          type: 'bar',
          data: history.map(({ bust }) => bust)
        }
      ]
    });
  }

  onUpdateHistory() {
    const self = this;
    socket.on('gameEnded', function (res) {
      const { bust, hash } = res;
      const { gameId = 100 } = self.props;
      let { history } = self.state;
      history = [{ gameId, bust, hash }, ...history];
      self.setState({
        history,
      });
      self.updateChart(history);
    });
  }

  buidChart() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.chartDOM);
    const { myChart } = this;
    myChart.showLoading();

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      calculable: true,
      grid: {
        top: '5%',
        left: '0%',
        right: '8%',
        bottom: '5%',
        containLabel: true
      },
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: function (a) {
              a = +a;
              return isFinite(a)
                ? echarts.format.addCommas(+a)
                : '';
            }
          }
        }
      ],
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 20
        },
        {
          type: 'inside',
          start: 94,
          end: 100
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 30,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: Array.from({ length: 50 }, (v, k) => `近${k + 1}期`)
        }
      ],
      series: [
        {
          type: 'bar',
          data: []
        }
      ]
    };

    myChart.setOption(option);
  }

  setRefs(ref) {
    this.chartDOM = ref;
  }
  render() {
    return (
      <div className="trends" ref={this.setRefs}></div>
    )
  }
}

const mapStateToProps = ({ Common }) => ({
  history: Common.history,
});

export default connect(mapStateToProps)(Trends);
