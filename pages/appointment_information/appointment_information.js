// pages/appointment_insolutionation/appointment_insolutionation.js
var app = getApp();
import http from '../../utils/api' // 引入api接口管理文件
Page({
  data: {
    bookerRole: '',
    bookerRoleList: ['','学生','老师'],
    bookerRoleIndex: 0,

    bookerRole: '',
    bookerRoleList: ['','本科生','研究生','老师'],
    bookerRoleIndex: 0,

    bookerGrade: '',
    bookerGradeList: ['','本科一年级','本科二年级','本科三年级','本科四年级',
                      '硕士生一年级','硕士生二年级','硕士生三年级','硕士生四年级',
                      '博士生','其他(请老师选择此项)'],
    bookerGradeIndex: 0,

    bookerDepartment: '',
    bookerDepartmentList: ['','金属材料系','土木工程材料系','材料加工工程系','功能材料系'],
    bookerDepartmentIndex: 0,

    topic: '',
    topicList: ['','学业困难','经济压力','就业压力','恋爱问题','同学矛盾','师生矛盾','其他'],
    topicIndex: 0,

    bookerGender: '',
    Gender:[  {value: "男", name: "男", checked: false},
              {value: "女", name: "女", checked: false}],

    solution: '',
    Solution:[  {value: "电话沟通", name: "电话沟通"},
                {value: "线下交流", name: "线下交流"}]
  },

  change_bookerRole(e){ 
    this.setData({
      'bookerRoleIndex': e.detail.value,
      'bookerRole': this.data.bookerRoleList[e.detail.value]
    }) 
    console.log(this.data.bookerRole)
  },
  change_bookerGrade(e){ 
    this.setData({
      'bookerGradeIndex': e.detail.value,
      'bookerGrade': this.data.bookerGradeList[e.detail.value]
    })
    console.log(this.data.bookerGrade)
   },
   change_bookerDepartment(e){ 
    this.setData({
      'bookerDepartmentIndex': e.detail.value,
      'bookerDepartment': this.data.bookerDepartmentList[e.detail.value]
    })
    console.log(this.data.bookerDepartment)
   },
  change_topic(e){ 
    this.setData({ 
      'topicIndex': e.detail.value,
      'topic': this.data.topicList[e.detail.value]
    }) 
    console.log(this.data.topic)
  },

  change_gender: function (e) {
    const items = this.data.Gender
    console.log(items.length)
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
      console.log(items[i].checked)
    }
    
    this.setData({ 
      'bookerGender': e.detail.value,
    }) 
    
    // console.log(this.data.bookerGender)
  },
  change_solution: function (e) {
    const items = this.data.Solution
    console.log(items.length)
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
      console.log(items[i].checked)
    }
    this.setData({ 
      'solution': e.detail.value,
    }) 
    console.log(this.data.solution)
  },

  appointment: function (e) {
    // http.userinfo({
    //   data: {},
    //   success:(res) =>{
        // console.log(res.data.data.name)
        // if (!res.data.data.name) {
        //   wx.showModal({
        //     title: '温馨提示',
        //     content: '授权才可预约',
        //     success (res) {
        //       if (res.confirm) {
        //         console.log('用户点击确定')
        //         wx.navigateTo({
        //           url: '/pages/authorize/authorize'
        //         })
        //       } else if (res.cancel) {
        //         console.log('用户点击取消')
        //       }
        //     }
        //   })
        // } else {
          var that = this;
          let appointment_info= e.detail.value;
          console.log(appointment_info);
          //判断提交数据是否合理
          if(e.detail.value.bookerName.length == 0){ 
            wx.showToast({
              title: '姓名不能为空',
              icon: 'error',
              duration: 2000,
            })
          } 
          else if(e.detail.value.bookerPhone == null || e.detail.value.bookerPhone.length != 11){ 
            wx.showToast({
              title: '请输入\n11位手机号',
              icon: 'error',
              duration: 2000,
            })
          } 
          else if(e.detail.value.bookerRole == null || e.detail.value.bookerRole.length == 0){ 
            wx.showToast({
              title: '请选择身份',
              icon: 'error',
              duration: 2000,
            })
          }
          else if(e.detail.value.bookerGrade == null || e.detail.value.bookerGrade.length == 0){ 
            wx.showToast({
              title: '请选择年级',
              icon: 'error',
              duration: 2000,
            })
          }
          else if(e.detail.value.bookerDepartment == null || e.detail.value.bookerDepartment.length == 0){ 
            wx.showToast({
              title: '请选择系所',
              icon: 'error',
              duration: 2000,
            })
          }
          else if(e.detail.value.bookerGender == null || e.detail.value.bookerGender.length == 0){ 
            wx.showToast({
              title: '请选择性别',
              icon: 'error',
              duration: 2000,
            })
          }
          else if(e.detail.value.solution.length == 0){ 
            wx.showToast({
              title: '请选择形式',
              icon: 'error',
              duration: 2000,
            })
          }
          else if(e.detail.value.topic.length == 0){ 
            wx.showToast({
              title: '请选择咨询主题',
              icon: 'error',
              duration: 2000,
            })
          }
          else if(e.detail.value.situationDesc.length ==0){ 
            wx.showToast({
              title: '主题描述\n不能为空',
              icon: 'error',
              duration: 2000,
            })
          }
          else if(e.detail.value.reservedDatetimes.length ==0){ 
            wx.showToast({
              title: '有空时段\n不能为空',
              icon: 'error',
              duration: 2000,
            })
          }
        else{
          http.reserve({
            data: 
            {
              bookerName: e.detail.value.bookerName,
              bookerPhone: e.detail.value.bookerPhone,
              bookerRole: e.detail.value.bookerRole,
              bookerGrade: e.detail.value.bookerGrade,
              bookerDepartment: e.detail.value.bookerDepartment,
              bookerGender: e.detail.value.bookerGender,
              solution: e.detail.value.solution,
              topic: e.detail.value.topic,
              situationDesc: e.detail.value.situationDesc,
              reservedDatetimes: e.detail.value.reservedDatetimes,
            },
        
            success:(res) =>{
              console.log(appointment_info);
              console.log(res.data.data)
              if(res.data.data){
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 1000,
                  success:(res) =>{
                    setTimeout(function (){
                      wx.switchTab({
                        url: '/pages/appointment/appointment',
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
    //   }
    // }
  // })
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
    console.log(this.data)
    http.userinfo({
      data: {},
      success:(res) =>{
        console.log(res.data.data)
        that.setData({
          'bookerName': res.data.data.name,
          'bookerPhone': res.data.data.phone,
          'bookerRole': res.data.data.role,
          'bookerGrade': res.data.data.grade,
          'bookerDepartment': res.data.data.department,
          'bookerGender': res.data.data.gender,
        })

        if(res.data.data.gender){//选中
          var i = res.data.data.gender == '男' ? 0 : 1;
          that.data.Gender[i].checked="true"
          that.setData({
            Gender: that.data.Gender
          })
        }
        else{
        }
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

})