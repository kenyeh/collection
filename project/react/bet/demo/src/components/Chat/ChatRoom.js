import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as actions from '../../actions/Chat';

import ChatInput from './ChatInput';
import Message from './Message';

import './ChatRoom.css';


class ChatRoom extends Component {

  constructor(props) {
    super(props);

    this.submitMessage = this.submitMessage.bind(this)
  }

  componentDidMount() {
    const { socket, dispatch } = this.props;

    socket.on('said', msg => {
      dispatch(actions.receiveMessage(msg))
    });
    
  }

  componentDidUpdate() {
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
  }
  
  submitMessage (e) {
    e.preventDefault();
  }

  render() {
    const { say, messages, userInfo, isLogin } = this.props
    // console.log(messages)
    return (
      <div className="chatroom">
        <div className="chatroom__chatlist">
          <ul className="chatroom__chatlist__content" ref="messageList">
            {messages.map((messageData, index) => <Message key={index} {...messageData}/>)}
          </ul>
        </div>
        <ChatInput say={say} userInfo={userInfo} isLogin={isLogin}/>
      </div>
    );
  }
}

ChatRoom.propTypes = {
  dispatch: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired,
};

export default ChatRoom;