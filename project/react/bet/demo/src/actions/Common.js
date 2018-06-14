
export function init(engineInfo) {
  return {
    type: 'init',
    history: engineInfo.history,
    cashOuts: engineInfo.cashOuts,
    playing: engineInfo.playing,
  };
}

export function setLogin(bool) {
  return {
    type: 'setLogin',
    isLogin: bool
  };
}


export function logedIn(data) {
  return {
    type: 'logedIn',
    userInfo: data
  };
}

export function changeUserInfoBalance (data) {
  return {
    type: 'changeBalance',
    balance: data
  };
}

