// pages/service/service.js
var app = getApp();
import http from '../../utils/api' // 引入api接口管理文件
Page({
  data: {
    message:[]
  },
  leave_message: function(options){
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },

   detail: function(e){
     // console.log(e)
    console.log(e.currentTarget.dataset)
    var idx = e.currentTarget.dataset.index;
    var that = this;
    wx.navigateTo({
      url: '/pages/message_information/message_information',
      success: function(res){
        res.eventChannel.emit('getParam', { data: that.data.message[idx] })
      }
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.message({
      data: {},
      success:(res) =>{
        res.data.data.pageList.map(item=>{
          delete item.mid
          delete item.leftDatetime
          })
        // console.log(res.data.data.pageList);
        this.setData({
          'message': res.data.data.pageList,
        })
      }
    })  
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
    http.message({
      data: {},
      success:(res) =>{
        res.data.data.pageList.map(item=>{
          delete item.mid
          delete item.leftDatetime
          })
        console.log(res.data.data.pageList);
        this.setData({
          'message': res.data.data.pageList,
        })
      }
    })  
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})