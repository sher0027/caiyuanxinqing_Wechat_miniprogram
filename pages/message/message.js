// pages/message/message.js
var app = getApp();
import http from '../../utils/api' // 引入api接口管理文件
Page({
  data: {
    bookerDepartment: '',
    bookerDepartmentList: ['','金属材料系','土木工程材料系','材料加工工程系','功能材料系'],
    bookerDepartmentIndex: 0,
    //用于动态显示输入文本数
    currentWordNumber: 0,
    CurrentWordNumber: 0,
    max: 20,
    Max: 200,
  },

  change_bookerDepartment(e){ 
    this.setData({
      'bookerDepartmentIndex': e.detail.value,
      'bookerDepartment': this.data.bookerDepartmentList[e.detail.value]
    })
    console.log(this.data.bookerDepartment)
   },

  service: function (e) {
    // http.userinfo({
    //   data: {},
    //   success:(res) =>{
    //     console.log(res.data.data.name)
    //     if (!res.data.data.name) {
    //       wx.showModal({
    //         title: '温馨提示',
    //         content: '授权才可留言',
    //         success (res) {
    //           if (res.confirm) {
    //             console.log('用户点击确定')
    //             wx.navigateTo({
    //               url: '/pages/authorize/authorize'
    //             })
    //           } else if (res.cancel) {
    //             console.log('用户点击取消')
    //           }
    //         }
    //       })
    //     } else {
          var that = this;
          let message = e.detail.value;
          //判断输入框是否合理
          if(e.detail.value.title.length == 0){ 
            wx.showToast({
              title: '标题不能为空',
              icon: 'error',
              duration: 2000,
            })
          } 
          else if(e.detail.value.content.length == 0){ 
            wx.showToast({
              title: '内容不能为空',
              icon: 'error',
              duration: 2000,
            })
          } 
          else if(e.detail.value.leaverName.length == 0){ 
            wx.showToast({
              title: '姓名不能为空',
              icon: 'error',
              duration: 2000,
            })
          }
          else if(e.detail.value.leaverPhone.length != 11){ 
            wx.showToast({
              title: '请输入\n11位手机号',
              icon: 'error',
              duration: 2000,
            })
          }
          else if(!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e.detail.value.leaverEmail)){ 
            wx.showToast({
              title: '请输入\n正确邮箱',
              icon: 'error',
              duration: 2000,
            })
          }
          else{ 
            http.leave_message({
              data: {//前端向后端发送的数据
                title: e.detail.value.title,
                content: e.detail.value.content,
                leaverName: e.detail.value.leaverName,
                leaverPhone: e.detail.value.leaverPhone,
                leaverEmail: e.detail.value.leaverEmail,
              },
              
              success:(res) =>{
                // console.log(message);
                console.log(res.data.data)
                if(res.data.data){
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 1000,
                    success:(res) =>{
                      setTimeout(function (){
                        wx.switchTab({
                          url: '/pages/service/service',
                        })
                      },500)
                    }
                  }) 
                }
                else{
                  wx.showToast({
                    title: '提交失败',
                    icon: 'error',
                    duration: 2000,
                  }) 
                }
              } 
            })    
          }
    //     }
    //   }
    // })
  },

  //字数限制  
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // console.log(e.detail);
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    // console.log(len)
    
    this.setData({
      'currentWordNumber': len //当前字数  
    });
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    // console.log(this.data)
  },

  texts: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // console.log(e.detail);
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    // console.log(len)
    
    this.setData({
      'CurrentWordNumber': len //当前字数  
    });
    //最多字数限制
    if (len > this.data.Max) return;
    // 当输入框内容的长度大于最大长度限制（Max)时，终止setData()的执行
    // console.log(this.data)
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // ios设备上textarea有默认padding，故在此判断机型
    var phone = wx.getSystemInfoSync();  //调用方法获取机型
    var that = this;
    if (phone.platform == 'ios') {
      that.setData({
        isIos: true
      });
    } else if (phone.platform == 'android') {
      that.setData({
        isIos: false
      });
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
    var that = this
    // wx.request({
    //   url: 'https://www.seuclab.cn/to/mse-emo/dev/userInfo',
    //   method: 'GET',
    http.userinfo({
      data: {},
      success:(res) =>{
        console.log(res.data.data)
        delete res.data.data.role;
        delete res.data.data.grade;
        delete res.data.data.gender;

        that.setData({
          'leaverName': res.data.data.name,
          'leaverPhone': res.data.data.phone,
          'leaverEmail': res.data.data.email,
        })
      }
    })
      
    // })  
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