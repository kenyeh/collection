import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Toast } from 'antd-mobile';

class ChatInput extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      inputValue: '',
      msgTemplateDisplay: 'none',
      msgTemplates: [
        '回覆讯息1',
        '回覆讯息2',
        '回覆讯息3'
      ]
    }

    this.sendMessage = this.sendMessage.bind(this)
  }
  
  componentDidMount() {

  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value }, () => {
      if (this.state.inputValue.length === 0) {
        this.setState({ msgTemplateDisplay: 'block'})
      } else {
        this.setState({ msgTemplateDisplay: 'none'})
      }
    });
  }

  handleKeyPress(e) {
    if(e.key === 'Enter'){
      this.sendMessage()
    }

    
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.sendMessage()
  }

  sendMessage () {
    const { say, userInfo , isLogin} = this.props
    const message = this.state.inputValue
    const _this = this

    if ((!userInfo.uname) && !isLogin) {
      Toast.info('请先登入');
      return ;
    }
    
    if (message.trim().length > 0) {
      // console.log('send msg')
      say(message).then(res => {
        // console.log(res)
        if (res.success === 1) {
          // clear input value
          _this.setState({ inputValue: '' }, () => {
            setTimeout(() => {
              this.setState({ msgTemplateDisplay: 'block'})
            }, 200)
          });
        }
      })
    }
    this.refs.chatMsgInput.focus();
  }

  onFocus () {
    // console.log('onFocus')
    if (this.state.inputValue.length === 0) {
      this.setState({ msgTemplateDisplay: 'block'})
    }

    const _this = this
    setTimeout(() => {
      _this.refs.chatMsgInput.scrollIntoView(true);
      _this.refs.chatMsgInput.scrollIntoViewIfNeeded();
    }, 200)
  }

  onBlur () {
    // console.log('onBlur')
    // for mobile delay
    setTimeout(() => {
      this.setState({ msgTemplateDisplay: 'none'})
    }, 200)
  }

  handleTemplateClick (e) {
    const msgText = e.currentTarget.textContent

    this.setState({ inputValue: msgText})
    this.refs.chatMsgInput.focus();
  }

  render() {
    const msgTemplateStyle = {
      display: this.state.msgTemplateDisplay
    }
    return (
      <div className="chatroom__inputbar">
        <div className="chatroom__inputbar__form">
          <div className="chatroom__inputbar__msgTemplate" style={msgTemplateStyle}>
            <ul>
              {this.state.msgTemplates.map((msgTemp, index) => <li key={index} onClick={this.handleTemplateClick.bind(this)}>{msgTemp}</li>)}
            </ul>
          </div>
          <input 
            type="text" 
            ref="chatMsgInput" 
            className="chatroom__inputbar__form__input" 
            placeholder="Write a message..." 
            value={this.state.inputValue} 
            onChange={this.handleChange.bind(this)} 
            onKeyPress={this.handleKeyPress.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
          />
          <div className="chatroom__inputbar__form__submit">
            <Button className="chatroom__inputbar__form__submit__btn" onClick={this.handleClick.bind(this)}>Send</Button>
          </div>
        </div>
      </div>
      
    );
  }
}

ChatInput.propTypes = {
  say: PropTypes.func.isRequired
};

export default ChatInput;