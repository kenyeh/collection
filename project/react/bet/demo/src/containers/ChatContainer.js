import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import * as actions from '../actions/Chat';
import { socket, joinChannel, say } from '../services'

import ChatRoom from '../components/Chat/ChatRoom'


export class ChatContainer extends Component {
  componentDidMount() {
    // init messages
    const { dispatch, channel } = this.props;

    if (channel !== '') {
      dispatch(actions.setChannelAsync(channel)).then(() => {
        joinChannel(channel)
        // load some messages
        socket.on('load messages', messages => {
          dispatch(actions.loadMessages(messages))
        });
      });
    }

    

  }
  render() {
    return (
      <ChatRoom {...this.props} socket={socket} say={say}/>
    );
  }
}

ChatContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  channel: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  isLogin: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  // console.log(state.Chat.messages[state.Chat.channel])
  return {
    channel: state.Chat.channel,
    messages: state.Chat.messages,
    isLogin: state.Common.isLogin,
    userInfo: state.Common.userInfo
  }
}

export default connect(mapStateToProps)(ChatContainer)
