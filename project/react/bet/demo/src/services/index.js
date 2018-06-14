// import axios from 'axios';
import { Toast } from 'antd-mobile';
import io from 'socket.io-client';

// socket io setting
export const socket = io('http://localhost:4000');

socket.on('connect', function () {
  Toast.success('连接成功', 1);
});
socket.on('disconnect', function () {
  Toast.fail('与服务器连接断开');
});
socket.on('connect_error', (error) => {
  // Toast.fail('连接失败');
});
// socket.on('reconnect_attempt', (attemptNumber) => {
//   Toast.loading(`第${attemptNumber}次重连中...`);
// });
socket.on('connect_timeout', (timeout) => {
  Toast.info(`连接超时`);
});

// socket.emit(eventName[, ...args][, ack])
/**
 * change to promise
 * usage:
 * login({user: 'robin', password: '123'}).then(res => {
 *    res.success === '1' && console.log('登录成功');
 *    // or
 *    dispatch(loginSuccess(res));
 * })
 * 或者用 async await 语法
 * async function() {
 *  const loginData = await login({user: 'robin', password: '123'});
 *  dispatch(loginSuccess(loginData));
 * }
 * @param {*} args 
 */
// curry and exchange to Promise
const generateEvent = eventName => (...args) => {
  return new Promise((resolve, reject) => {
    socket.emit(eventName, ...args, function (res) {
      resolve(res);
    });
    setTimeout(() => {
      reject(eventName + '请求超时无响应');
    }, 3000);
  }).catch(err => {
    Toast.fail(eventName + '请求超时无响应');
    // throw err;
  });
}

/**
 * login
 * @param {*} args { uname: String, password: String, }
 */
export const login = (...args) => {
  return generateEvent('login')(...args);
}

/**
 * register
 * @param {*} args { uname: String, password: String, email: String, }
 */
export const register = (...args) => {
  return generateEvent('register')(...args);
}

/**
 * logout
 * @param {*} args none
 */
export const logout = (...args) => {
  return generateEvent('logout')(...args);
}

/**
 * getUserInfo
 * @param {*} args { uname: String, }
 */
export const getUserInfo = (...args) => {
  return generateEvent('getUserInfo')(...args);
}

/**
 * getGameInfo
 * @param {*} args { gameId: Number }
 */
export const getGameInfo = (...args) => {
  return generateEvent('getGameInfo')(...args);
}

/**
 * getBetInfo
 * @param {*} args none
 */
export const getBetInfo = (...args) => {
  return generateEvent('getBetInfo')(...args);
}

/**
 * bet
 * @param {*} args { wager: Number, payout: Number, }
 */
export const bet = (...args) => {
  return generateEvent('bet')(...args);
}

/**
 * cashOut
 * @param {*} args Number
 */
export const cashOut = (...args) => {
  return generateEvent('cashOut')(...args);
}

/**
 * joinChannel
 * @param {*} args [channelName]//String
 */
export const joinChannel = (...args) => {
  return generateEvent('joinChannel')(...args);
}

/**
 * say
 * @param {*} args { msg: String, }
 */
export const say = (...args) => {
  return generateEvent('say')(...args);
}

/**
 * say
 * @param {*} args { msg: String, }
 */
export const init = (...args) => {
  return generateEvent('init')(...args);
}
