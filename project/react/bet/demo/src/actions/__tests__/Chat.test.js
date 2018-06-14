import * as types from '../../constants/ActionTypes';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  receiveMessage,
  loadMessages,
  setChannel,
  setChannelAsync
} from '../Chat';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('filter actions', () => {
  it('should create an action to receive message', () => {
    const message = [
      {id: 0,created: '00:00',level: 'lv1',msg: 'test message',uname: 'test'}
    ];
    const expectedAction = {
      type: types.RECEIVE_MESSAGE,
      message
    }
    expect(receiveMessage(message)).toEqual(expectedAction);
  });

  it('should create an action to load Messages', () => {
    const messages = [
      {id: 0,created: '00:00',level: 'lv1',msg: 'test message',uname: 'test'},
      {id: 0,created: '00:00',level: 'lv1',msg: 'test message',uname: 'test'}
    ];
    const expectedAction = {
      type: types.LOAD_MESSAGES,
      messages
    }
    expect(loadMessages(messages)).toEqual(expectedAction);
  });

  it('should create an action to set Channel', () => {
    const channel = 'public';
    const expectedAction = {
      type: types.SET_CHANNEL,
      channel
    }
    expect(setChannel(channel)).toEqual(expectedAction);
  });

  it('should create an action to set Channel Async', () => {
    const channel = 'public';
    const expectedActions = [
      { type: types.SET_CHANNEL, channel: channel}
    ]
    const store = mockStore({ channel: channel })

    return store.dispatch(setChannelAsync(channel))
      .then(() => { // 回傳非同步的 action
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
})
