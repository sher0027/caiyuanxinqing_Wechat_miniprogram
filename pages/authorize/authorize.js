// pages/authorize/authorize.js
var app = getApp();
import http from '../../utils/api'; // 引入api接口管理文件
// import {request_login} from '../../utils/index';

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false
  },

  wxGetUserProfile: function () {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '用户登录',
        success: (res) => {
          console.log('userProfile获取userInfo')
          console.log(res);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          resolve(res)   
          
          wx.showToast({ //显示消息提示框
            icon: "success",
            title: '欢迎使用',
            duration: 1000, 
            success:(res) =>{
              setTimeout(function (){
                wx.navigateBack()
              },500)
            }
          })
        },
        // 失败回调
        fail: (err) => {
          reject(err)
          wx.showToast({ //显示消息提示框
            icon: "error",
            title: '小程序\n需要授权',
            duration: 1500, 
          })
        }
      })
    })
  },

  wxSilentLogin: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success (res) {
          console.log('login获取code')
          console.log(res);//authorize.js? [sm]:58
          resolve(res.code)// jsCode
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },

  login: function (e) {
    let p1 = this.wxSilentLogin()
    let p2 = this.wxGetUserProfile()
    Promise.all([p1, p2]).then((res) => {
      console.log(res);//authorize.js? [sm]:75
      let jsCode = res[0]
      let nickName = res[1].userInfo.nickName
      let avatar = res[1].userInfo.avatarUrl
      let gender = res[1].userInfo.gender
      let iv = res[1].iv
      let encryptedData = res[1].encryptedData
      // 请求服务器
      // wx.request({
      //   url: 'https://www.seuclab.cn/to/mse-emo/dev/mini/login',
      http.login({
        data: { //前端向后端发送的数据（后：前）
          jsCode: jsCode,
          nickName: nickName,
          avatar: avatar,
          gender: gender,
          encryptedData: encryptedData,
          iv: iv
        },
 
        success (res) {
          console.log(res);
          // //登录成功将后端返回的token存储到本地缓存中
          wx.setStorageSync('token', res.data.data);
          console.log(wx.getStorageSync('token'));
        }
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  //   // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '用于登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //       wx.login({
  //         success: res =>{
  //           let code = res.code //这里获取的就是登陆的code，可以传送给后端来换取openid和unionid
  //           let data = {}  //请求数据
  //           let methods = "POST"// 请求方式
  //           app.postAjax(""+ code, data, methods).then( res=> {   
  //           console.log(res)   //获取后端传来的值。
  //           })

  //           wx.switchTab({
  //             url: '/pages/appointment/appointment',
  //           })
  //         }
  //       })
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
})