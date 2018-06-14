import * as types from '../constants/ActionTypes';

export function receiveMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}

export function loadMessages(messages) {
  return {
    type: types.LOAD_MESSAGES,
    messages
  };
}

export function setChannel(channel) {
  return {
    type: types.SET_CHANNEL,
    channel
  }
}

export function setChannelAsync(channel) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(setChannel(channel));
    resolve();
  });
}

export function setName(name) {
  return {
    type: 'SET_NAME',
    name
  };
}