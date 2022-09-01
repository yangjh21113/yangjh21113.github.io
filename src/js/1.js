import axios from 'axios';

let authorizing = false;
// 定义一个请求队列，方便我们刷新后重新请求
let authQueue = [];

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // token 过期 401 肯定是走到error这里的
    const { status } = response;
    if (status !== 401) {
      return Promise.reject(error);
    }
    const token = localstorage.getItem('TOKEN'); // 假设token存在localstorage
    if (token) {
      // 如果正在刷新token就返回
      // 并且把当前这个不是刷新token的请求放入请求队列中，用于后续重新请求
      if (authorizing) {
        return new Promise((resolve, reject) => {
          authQueue.push({
            req: error.raw.config,
            resolve,
            reject,
          });
        });
      }
      // 如果不是正在刷新，并且，获取到本地存储的token,和当前请求头携带的一致，就开始刷新
      if (token === error.raw.config.headers.Authorization && !authorizing) {
        // 这是个异步请求的方法  这个方法后面会实现
        startRefreshToken((newToken) => {
          // 这个刷新的方法有一个回掉函数，参数是新的token,用于重新请求
          authorizing = false; // 刷新完毕，修改状态
          if (newToken) {
            // 开始使用新token，重新请求
            authQueue.forEach((item) => {
              item.req.headers = item.req.headers || {};
              item.req.headers.Authorization = newToken;
              axios.request(item.req).then(item.resolve).catch(item.reject);
            });
          } else {
            // 没有新的token, 也就是说本地存的refreshToken也过期了，队列中的每个请求都抛出错误信息
            authQueue.forEach((item) => {
              item.reject('登录过期', error.raw);
            });
          }
          authQueue.length = 0; // 清空请求队列,没错数组可以通过修改长度清空，这个没有不知道的吧
        });
        return new Promise((resolve, reject) => {
          authQueue.push({
            req: error.raw.config,
            resolve,
            reject,
          });
        });
      }

      // 如果token 已经更新了，或者 没有正在刷新token ,就重新请求当前的请求

      // 这一步的目的是保留headers上面的其他信息， 同时可以用下一句更新header.Authorization
      error.raw.config.headers = error.raw.config.headers || {};
      error.raw.config.headers.Authorization = token; // 这个是已经更新了的token
      return axios.request(error.raw.config); // 重新请求
    }
    return Promise.reject(error);
  }
);

// 是否正在刷新，如果是，就返回，不要重复刷新了
let refreshing = false;
//回调函数的数组，因为请求是源源不断的发的，肯定要都拦截，都要重新请求，所以要暂存一下
let callbacks = [];
async function startRefreshToken(callback) {
  if (callback) {
    callbacks.push(callback); // 暂存当前请求的callback
  }
  if(refreshing) {
    return;
  }
  refreshing = true;
  let newToken = '';
  let errMsg = '';
  try {
    // 获取我们存在本地的refreshToken
    const oldRefreshToken = localStorage.getItem('REFRESH_TOKEN');
    if (oldRefreshToken) {
      const { data }= await axios.post(
        'xxx', // 这个是你们后端的api
        {
          refresh_token: oldRefreshToken,
        },
        {
          headers: {}, // 刷新token的请求headers肯定不要携带Authorization字段
        }
      );
      // 这是新返回的token和refreshToken,注意refreshToken也会更新
      const { token, refreshToken } = data

      newToken = token; // 给callback调用

      // 更新本地的存储的值, 这之后还可以用来修改vuex里的值，反正你有新token了，随你干点啥
      localStorage.setItem('TOKEN', token);
      localStorage.setItem('REFRESH_TOKEN', refreshToken);
    }
  } catch (err) {
    errMsg = err.message;
    console.log(errMsg)
  }
  // 执行所有的回调函数
  callbacks.forEach((callback) => {
    // 如果本地存的refreshToken过期了，到这一步  newToken = ''
    callback(newToken); 
  });

  // 清空回调函数的数组
  callbacks.length = 0;
  // 重置状态
  refreshing = false;
}
