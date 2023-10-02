// pages/appointment/appointment.js
var app = getApp();
import http from '../../utils/api' // 引入api接口管理文件
Page({
  data: {
    unfinished:{
      totalRecord: 0,
      totalPage: 0,
      datalist:[],
    },
       
    finished:{
      totalRecord: 0,
      totalPage: 0,
      datalist:[],
    },
    // token: ''
  },
  
  make_appointment: function (options) {
    wx.navigateTo({
      url: '/pages/appointment_information/appointment_information',
    })
  },
 
  communicate: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset)
    var idx = e.currentTarget.dataset.index;
    var that = this;
    if(e.target.offsetTop == 17 && e.target.offsetLeft == 312){
      var isPhoneCallable = e.currentTarget.dataset.id == 1 ? (that.data.finished.datalist[idx].isPhoneCallable) : (that.data.unfinished.datalist[idx].isPhoneCallable)
      if(isPhoneCallable){
        var phoneNumber = e.currentTarget.dataset.id == 1 ? (that.data.finished.datalist[idx].solverPhone) : (that.data.unfinished.datalist[idx].solverPhone)

        console.log("一键拨打电话", phoneNumber);
        wx.makePhoneCall({
          phoneNumber: phoneNumber
        })
      }else
      {
        wx.showToast({
          title: '尚未确认\n不可拨号',
          duration: 2000,
          icon: 'error',
        })
      }
    }else{
      wx.navigateTo({
        url: '/pages/communicate/communicate',
        success: function(res){
          if(e.currentTarget.dataset.id == 1){
            res.eventChannel.emit('getParam', { data: that.data.finished.datalist[idx] })
          }
          else{
            console.log(that.data.unfinished.datalist[idx])
            res.eventChannel.emit('getParam', { data: that.data.unfinished.datalist[idx] })
          }
        },
        // events:{
          // // 为指定事件添加一个监听器，获取被打开页面传送到当前页面数据
          //   someEvent: function(data) {
          //     console.log(data)
          //   }
          // }
      })
    }
  },  
 
  onLoad: function (options) {
    var that = this;
    let token = wx.getStorageSync("token");
    console.log(token)
    if (token == '') {
      app.Login().then(res => {
        console.log("promise回调后的数据：");
        console.log(res);
        if (res == 200) {
        //把首页需要请求的数据接口都提取到一个自定义方法中
        // 未完成预约
        http.unfinished({
          data: {},
          success:(res) =>{
            // res.data.data.pageList.map(item=>{
            //   delete item.rid
            //   delete item.createdDatetime
            //   })
            console.log(res.data);
            that.setData({
              'unfinished.totalRecord': res.data.data.totalRecord,
              'unfinished.totalPage': res.data.data.totalPage,
              'unfinished.datalist': res.data.data.pageList,
            })
          }
        })

        // 已完成预约
        http.finished({
          data: {},
          success:(res) =>{
            // res.data.data.pageList.map(item=>{
            //   delete item.rid
            //   delete item.createdDatetime
            // })
            // console.log(res.data.data.pageList);
            that.setData({
              'finished.totalRecord': res.data.data.totalRecord,
              'finished.totalPage': res.data.data.totalPage,
              'finished.datalist': res.data.data.pageList,
            })
          }
        })    
      }
    })
  } else{
      // 未完成预约
      http.unfinished({
        data: {},
        success:(res) =>{
          // res.data.data.pageList.map(item=>{
          //   delete item.rid
          //   delete item.createdDatetime
          //   })
          console.log(res.data);
          that.setData({
            'unfinished.totalRecord': res.data.data.totalRecord,
            'unfinished.totalPage': res.data.data.totalPage,
            'unfinished.datalist': res.data.data.pageList,
          })
        }
      })

      // 已完成预约
      http.finished({
        data: {},
        success:(res) =>{
          // res.data.data.pageList.map(item=>{
          //   delete item.rid
          //   delete item.createdDatetime
          // })
          // console.log(res.data.data.pageList);
          that.setData({
            'finished.totalRecord': res.data.data.totalRecord,
            'finished.totalPage': res.data.data.totalPage,
            'finished.datalist': res.data.data.pageList,
          })
        }
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
    //未完成预约
    // wx.request({
    //   url: 'https://www.seuclab.cn/to/mse-emo/dev/mini/unhandledReservations',
    //   method: 'GET',
    //   header: {
    //     'content-type': 'application/json',
    //     'Authorization': wx.getStorageSync('token') ? `Bearer ${wx.getStorageSync('token')}` : '',
    //   },
    http.unfinished({
      data: {},
      success:(res) =>{
        // res.data.data.pageList.map(item=>{
        //   delete item.rid
        //   delete item.createdDatetime
        //   })
        // console.log(res.data.data.pageList);
        this.setData({
          'unfinished.totalRecord': res.data.data.totalRecord,
          'unfinished.totalPage': res.data.data.totalPage,
          'unfinished.datalist': res.data.data.pageList,
        })
      }
    })
    // })  

    //已完成预约
    // wx.request({
    //   url: 'https://www.seuclab.cn/to/mse-emo/dev/mini/handledReservations',
    //   method: 'GET',
    http.finished({
      data: {},
      success:(res) =>{
        // res.data.data.pageList.map(item=>{
        //   delete item.rid
        //   delete item.createdDatetime
        //   })
        // console.log(res.data.data.pageList);
        this.setData({
          'finished.totalRecord': res.data.data.totalRecord,
          'finished.totalPage': res.data.data.totalPage,
          'finished.datalist': res.data.data.pageList,
        })
      }
    })   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

})