import React, {PureComponent} from 'react'
import {game} from './game/game.js'
import {SegmentedControl, Button,Flex,Modal,WingBlank,WhiteSpace,Slider} from 'antd-mobile'
import './bet.css'
import {bet,login,socket,init,cashOut} from '../../services/index'
import { connect } from 'react-redux'
import {init as historyInit,setLogin,logedIn,changeUserInfoBalance} from '../../actions/Common'

import Cookies from 'universal-cookie';

const prompt = Modal.prompt;

const cookies = new Cookies();


class Bet extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      userBalance: 0,
      wager: 2,
      payout: 2,
      winChance: '---',
      profit: '---',
      hold: false,
      betted: false,
      icharts: {},
      buttonText: '投注',
      buttonDisable: false,
    };
    this._iCharts = {}
  }

  render() {
    return (
      <div style={{width: '100%', height: '100%'}} >
        <div style={{width: '100%', height: '70%'}} id="canvas"></div>
        <div style={{height: '30%'}}>
          {this.props.isLogin &&<div className="bet--bet-controls">
            <div className="bet--bet-input">
              {this.state.errorMsg && <p className='bet--error-msg'>{this.state.errorMsg}</p>}
              <div className="bet--input-line">
                <label>下注金额</label>
                <input onChange={this.handleInputChange}
                       onBlur={this.checkAmount}
                       name="wager"
                       value={this.state.wager}
                       type="number"></input>
                <span className="bet--button-box" >
                    <SegmentedControl selectedIndex={0} values={['角', '元']}
                                      onChange={this.onChange}
                    />
                </span>
              </div>
              <div className="bet--input-line">
                <label>选择数值</label>
                <input onChange={this.handleInputChange}
                       onBlur={this.checkAmount}
                       name="payout"
                       value={this.state.payout}
                       type="number"></input>

                <span>
                          <Button type="primary" inline size="small" className="bet--button" onClick={ () => this.addPayout(0.1)}>+0.1</Button>
                  <Button type="primary" inline size="small" className="bet--button" onClick={ () => this.addPayout(1)}>+1</Button>

                </span>

              </div>
            </div>

            <div className="bet--bet-confirm">
              <Button disabled={this.state.buttonDisable} style={{height:'100%'}} type="warning" onClick={ (e) => this.submit()}>{this.state.buttonText}</Button>
            </div>
          </div>}


          {this.props.isLogin &&<Flex>
            <Flex.Item className="bet--flex">利润：{this.state.profit}</Flex.Item>
            <Flex.Item className="bet--flex">概率：{this.state.winChance}</Flex.Item>
            <Flex.Item className="bet--flex">余额：{Number(this.props.userInfo.balance).toFixed(2)}</Flex.Item>
          </Flex>}
            
          { !this.props.isLogin && <WingBlank size="lg">
            <WhiteSpace size="lg" />
            <Button onClick={() => prompt(
              '登录',
              '请输入账号密码',
              (login, password) => {this.submitLogin(login,password)},
              'login-password',
              null,
              ['用户名', '密码'],
            )}
            >登录</Button>
          </WingBlank>}

        </div>
      </div>
    )
  }

  componentDidMount() {
    let data = {
      bust: 0,
      elapsed: 0,
      gameId: 0,
      gameState: "GAME_ENDED",
      errorMsg: ''
    };
    var icharts = game(document.getElementById('canvas'))
    this._iCharts = icharts

    icharts.initialize(data)
    this.autoLogin((data)=>{

      this.props.historyInit(data.engineInfo)

      if(data.loggedIn){
        this.props.logedIn(data.loggedIn.userInfo)
      }

      icharts.initialize(data.engineInfo)
      socket.on('gameStarting', (msg) => {
        icharts.gameStarting()
        if(this.state.hold){
          this.submit(true)
          this.changeButton('投注中',false,true)
        }
      });
      socket.on('cashedOut',  (msg) => {
        icharts.cashedOut(msg[0])
        if(msg[1].length>0){
          msg[1].forEach((value,index,arr)=>{
            if(value[1] === this.props.userInfo.uname){
              this.userBust(msg[0])
              return
            }
          })
        }

      });
      socket.on('gameStarted',  (msg) => {
        icharts.gameStarted()
          if(this.state.betted){
            this.changeButton('撤资',false,false)
          }else{
            this.changeButton('投注',false,false)
          }
        }
      );

      socket.on('gameEnded', (msg) => {
        icharts.gameEnded(msg)
        if(this.state.betted){
          this.changeButton('投注',null,false)
          this.setState({
            betted: false
          })
        }
      });
    })

    this.setInputInfo()
  }
  onChange = (e) => {
    this.setState({
      type: e.nativeEvent.selectedSegmentIndex
    });


  }

  checkAmount = () => {

  }
  checkPayout = () => {

  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    let value = Number(target.value);
    if(name === 'wager'){
      value = parseInt(value,10)
    }else{
      if(!this.isInteger(Number(value)) && value.toString().split(".")[1].length>2){
        value = Number(value).toFixed(2)
      }
    }

    if(value === 0){
      value = ''
    }
    this.setState({
      [name]: value
    },() => {
      this.setInputInfo()
    });
  }
  userBust = (bust) => {
    this.changeButton('投注',false,false)
    this.setState({
      betted: false
    })

    const balance = Number(this.props.userInfo.balance) + Number(this.state.wager)*Number(bust)
    console.log(balance)
    this.props.changeUserInfoBalance(balance)
  }
  setInputInfo = () => {
    this.setState({
      winChance: this.winChance() ? this.winChance().toFixed(2).toString() + "%" : "---",
      profit: this.potentialProfit() ? this.potentialProfit().toFixed(2) : "---"
    });
  }

  //投注按钮
  submit = (bool) => {
    var status = this._iCharts.getStatus()

    if(this.state.betted){
      this.submitCashOut()
      return
    }

    if(status === 'GAME_STARTING' || bool){
      bet({wager: this.state.wager, payout: this.state.payout}).then(res => {
        //投注成功
        if(res){
          this.changeButton('投注中',false,true)
          this.setState({
            betted: true
          })
          const balance = Number(this.props.userInfo.balance) - Number(this.state.wager)
          this.props.changeUserInfoBalance(balance)

        }
      }).catch(res => {
        console.log(res)
      })
    } else {
      if(this.state.hold){
        this.changeButton('投注',false)
      }else{
        this.changeButton('取消投注',true)
      }
    }
  }
  //改变状态
  changeButton = (value,hold,disabled) => {

    this.setState({
      buttonText: value,
    });
    if(hold !== null){
      this.setState({
        hold: hold,
      });
    }
    if(disabled !== undefined){
      this.setState({
        buttonDisable: disabled,
      });
    }
  }
  //资金调整按钮事件
  addPayout = (v) => {
    var n = Number(this.state.payout) + Number(v)
    this.setState({
      payout: this.isInteger(n)? parseInt(n,10): n.toFixed(2),
      winChance: this.winChance() ? this.winChance().toFixed(2).toString() + "%" : "---",
      profit: this.potentialProfit() ? this.potentialProfit().toFixed(2) : "---"
    });
  }
  //是否整数
  isInteger = (obj) => {
    return parseInt(obj, 10) === obj
  }

  //计算赢钱概率
  winChance = () => {
    return !isNaN(this.state.payout) ? 99 / Number.parseFloat(this.state.payout):null
  }


  potentialProfit = () => {
    // console.log(Number.parseInt(this.state.wager) * (Number.parseFloat(this.state.payout) - 1))
    return !isNaN(this.state.wager) && !isNaN(this.state.payout) ?  Number.parseInt(this.state.wager,10) * (Number.parseFloat(this.state.payout) - 1) :null
  }
  //登录接口
  submitLogin = (login2,password) => {
    login({uname: login2, password: password}).then(res => {
      if(res){
        cookies.set('uname', res['uname'], { path: '/' })
        this.props.logedIn(res)
        this.props.setLogin(true)
      }
    }).catch(res => {
      console.log(res)
    })
  }
  //自动登录
  autoLogin = (callback) => {
    var data = {}

    if(cookies.get('uname')){
      this.props.setLogin(true)
      data = {
        uname: cookies.get('uname')
      }
    }else{
      this.props.setLogin(false)
    }

    init(data).then(res => {
      callback && callback(res)
    }).catch(res => {
      console.log(res)
    })
  }
  //撤资
  submitCashOut = () => {
    cashOut({}).then(res => {
      if(res){
        this.changeButton('投注',false,false)
        this.setState({
          betted: false
        })
      }
    }).catch(res => {
      console.log(res)
    })
  }


  changeWager = () => {
    return (value) => {
      this.setState({
          wager: value
      })
    };
  }

  changePayout = () => {
    return (value) => {
      this.setState({
        payout: value
      })
    };
  }
}


function mapStateToProps(state) {
  return {
    isLogin: state.Common.isLogin,
    userInfo: state.Common.userInfo
  }
}

const mapDispatchToProps = {
  historyInit,
  setLogin,
  logedIn,
  changeUserInfoBalance
}

export default connect(mapStateToProps, mapDispatchToProps)(Bet)
