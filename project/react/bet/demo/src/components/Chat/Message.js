import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      msgType: 'user'
    }
  }
  

  render() {
    const msgData = this.props
    return (
      <li className="chatroom__chatlist__content__message">
        <span className="chatroom__chatlist__content__message_time">{msgData.created}</span>
        <span className="chatroom__chatlist__content__message_lv">{msgData.level}</span>
        <a className="chatroom__chatlist__content__message_name">{msgData.uname}</a>
        {this.state.msgType === 'user' ? (
          <span className="chatroom__chatlist__content__message_msg_user">：{msgData.msg}</span>
        ) : (
          <span className="chatroom__chatlist__content__message_msg_sys">{msgData.msg}</span>
        )}
      </li>
    );
  }
}

Message.propTypes = {
  created: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  uname: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired
};

export default Message;