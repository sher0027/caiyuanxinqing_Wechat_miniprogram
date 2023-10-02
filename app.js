// app.js
// var app = getApp();
// import { http } from './http';
// import http from '../../utils/api' // 引入api接口管理文件

App({
  onLaunch() {
    wx.clearStorageSync();
    // console.log('测试token')
    // console.log(wx.getStorageSync('token'));
  },
/**
* 用户登录请求封装(解决onlaunch和onload执行顺序问题)
*/
Login: function() {
  var that = this;
  //定义promise方法
  return new Promise(function(resolve, reject) {
  // 调用登录接口
    wx.login({
      success: res => {
        // console.log(res)
        if (res.code) {
          let jsCode = res.code;
          wx.showLoading({
            title: '加载中',
          })
          console.log(jsCode)
          // 此处调用接口获取token
          //发起网络请求
          wx.request({
            url: 'https://www.seuclab.cn/to/mse-emo/dev/mini/login',
            method:'POST',
            data: { //前端向后端发送的数据（后：前）
              jsCode: jsCode,
            },  
            success (res) {
              console.log(res.data)
              if (res.data.message == '登录成功!') {
                wx.hideLoading();
                //登录成功将后端返回的token存储到本地缓存中
                that.globalData.token = res.data.data;
                console.log(that.globalData.token)
                wx.setStorageSync('token', res.data.data);
                //promise机制放回成功数据
                resolve(res.data.status);
              } else {
                wx.setStorageSync('token', '');
                reject('error');
              }
            },
            fail: function(res) {
              reject(res);
              wx.showToast({
              title: '系统错误'
              })
            },
            complete: () => {} //complete接口执行后的回调函数，无论成功失败都会调用 
          })
        } else {
          reject("error");
        }
      }
    })
  })
}, 
  globalData: {
    token: '',
    userInfo: ''
  },
})
