import http from '../../utils/api' // 引入api接口管理文件

// pages/communicate/communicate.js
let eventChannel; 

Page({
  data: {
    appoint_detail:{
      rid:'', topic: '', solvedDatetimeString: '', solverName: '', solverPhone: '', solvedPlace: '', isPhoneCallable: true
    }  
},

  call: function (options) {
    if(this.data.appoint_detail.isPhoneCallable){
      console.log("一键拨打电话", this.data.appoint_detail.solverPhone);
      wx.makePhoneCall({ phoneNumber: this.data.appoint_detail.solverPhone})
    }else
    {
      wx.showToast({
        title: '尚未确认\n不可拨号',
        duration: 2000,
        icon: 'error',
      })
    }
    
  },

  administer: function (options) {
    wx.openCustomerServiceChat({
      extInfo: {url: ''},
      corpId: '',
      success(res) {}
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(that.data.detail)
    eventChannel = this.getOpenerEventChannel(); 
		eventChannel.on("getParam",function(data){
      console.log(data.data);//传递过来的参数
      that.setData({
        'appoint_detail': data.data,
      }, () =>{
          console.log(that.data.appoint_detail)
          let rid = that.data.appoint_detail.rid;
          http.reserve_detail({
            data: {
              rid: rid
            },
            success:(res) =>{
              console.log(rid)
              console.log(res.data)
              that.setData({
                'appoint_detail.solvedDatetimeString': res.data.data.solvedDatetimeString,
                'appoint_detail.solvedPlace': res.data.data.solvedPlace,
              })
            }
          })
        }
      )
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

})