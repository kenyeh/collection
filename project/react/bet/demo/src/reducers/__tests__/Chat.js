import * as types from '../../constants/ActionTypes';
import reducer from '../Chat'

describe("Chat test case", () => {

  const initialState = {
    uname: '',
    channel: 'public',
    messages: []
  };

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle the LOAD_MESSAGES', () => {
    expect(
      reducer([], {
        type: types.LOAD_MESSAGES,
        messages: [
          {id: 0,created: '00:00',level: 'lv1',msg: 'test message',uname: 'test'},
          {id: 0,created: '00:00',level: 'lv1',msg: 'test message',uname: 'test'}
        ]
      })
    ).toEqual(
      {
        messages: [
          {id: 0,created: '00:00',level: 'lv1',msg: 'test message',uname: 'test'},
          {id: 0,created: '00:00',level: 'lv1',msg: 'test message',uname: 'test'}
        ]
      }
    )
  })
  
  
  it('should handle the RECEIVE_MESSAGE', () => {
    const newMessage = {id: 0,created: '00:00',level: 'lv1',msg: 'new message',uname: 'new'}

    expect(
      reducer(initialState, {
        type: types.RECEIVE_MESSAGE,
        message: newMessage
      })
    ).toEqual(
      {
        ...initialState,
        messages: [
          ...initialState.messages,
          newMessage
        ]
      }
    )

    
    const someMessage = [
      {id: 0,created: '00:00',level: 'lv1',msg: 'test message',uname: 'test'},
      {id: 0,created: '00:00',level: 'lv1',msg: 'test message',uname: 'test'}
    ]

    expect(
      reducer({
        ...initialState,
        messages: someMessage
      }, {
        type: types.RECEIVE_MESSAGE,
        message: newMessage
      })
    ).toEqual(
      {
        ...initialState,
        messages: [
          ...someMessage,
          newMessage
        ]
      }
    )
    
  })
  
});