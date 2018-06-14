const initialState = {
  userInfo: {},
  history: [],
  playing: [],
  cashOuts: [],
  isLogin: false

};

export default function Common(state = initialState, action) {
  switch (action.type) {
  case 'init':
    return {...state,
      history: action.history,
      cashOuts: action.cashOuts,
      playing: action.playing,
    };
    case 'changeBalance':
      return {...state,
        'userInfo': {...state.userInfo, balance: action.balance}
      };
    case 'logedIn':
      return {...state,
        userInfo: action.userInfo
      };
  case 'setLogin':
    return {...state,
      isLogin: action.isLogin}
  default:
    return state;
  }
}
