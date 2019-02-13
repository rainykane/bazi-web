import Vue from 'vue'
import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

// 配置API接口地址
var root = process.env.API_ROOT;
 
// 引用axios
var axios = require('axios');
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}
 
function apiAxios (method, url, params,type, headers, success, failure) {
  if (params) {
    params = filterNull(params);
  }
  if(type === 'app') {
    url  = "/app" + url;
  }else if(type === 'cesuan') {
    url = "/cesuan" + url;
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST'  ? params : null,
    params: method === 'GET'  ? params : null,
    baseURL: root,
    headers: headers,
    withCredentials: false
  })
  .then(function (res) {
    if(type === 'app') {
      if (res.data.code === 'success') {
        if (success) {
          success(res.data);
        }
      } else {
        if (failure) {
          failure(res.data);
        }else {
          Vue.$vux.toast.text(res.data.msg,'center');
          return;
        }
      }
    }else {
      if (success) {
        success(res.data);
      }
    }
  })
  .catch(err => {
    if(err.response) {
      if(failure) {
        failure(err.response);
        return;
      }
    } 
    if((err + '').indexOf('Network') !== -1) {
      Vue.$vux.toast.text('请检查网络设置','center');
    }
    Vue.$vux.toast.text('' + err,'center');
    return;
  })
}
 
// 返回在vue模板中的调用接口
export default {
  get: function (url, params,type,headers, success, failure) {
    return apiAxios('GET', url, params,type,headers, success, failure);
  },
  post: function (url, params,type,headers, success, failure) {
    return apiAxios('POST', url, params,type,headers, success, failure);
  }
 
}