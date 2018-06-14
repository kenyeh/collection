import {
  ADD_MESSAGE,
  RECEIVE_MESSAGE,
  LOAD_MESSAGES,
  SET_CHANNEL
} from '../constants/ActionTypes';


const initialState = {
  uname: '',
  channel: 'public',
  messages: []
};

export default function Chat(state = initialState, action) {
  switch (action.type) {
  case ADD_MESSAGE:
    return {...state,
      data: [...state.data, action.message]
    };
  case RECEIVE_MESSAGE:
    return {...state,
      messages: [
        ...state.messages,
        action.message
      ]
    };
  case LOAD_MESSAGES:
    return {...state,
      messages: action.messages.reverse()
    };
  case SET_CHANNEL:
    return {...state,
      channel: action.channel,
  };
  default:
    return state;
  }
}