// 在这里面定义所有接口，一个文件管理所有接口，易于维护
import { http } from './http'; // 引入刚刚封装好的http模块，import属于ES6的语法，微信开发者工具必须打开ES6转ES5选项


function login(params) { // 登录接口
  http('/mini/login', 'POST', params)
}

function unfinished(params) { // 获取未完成预约接口
  http('/mini/unhandledReservations?pageIndex=1&pageSize=100', 'GET', params)
}

function finished(params) { // 获取完成预约接口
  http('/mini/handledReservations?pageIndex=1&pageSize=100', 'GET', params)
}

function reserve_detail(params) { // 获取预约详情接口
  http('/mini/reservationDetail', 'GET', params)
}

function reserve(params) { // 预约接口
  http('/mini/reserve', 'POST', params)
}

function userinfo(params) { // 获取用户信息接口
  http('/mini/userInfo', 'GET', params)
}

function message(params) { // 获取留言接口
  http('/mini/messages?pageIndex=1&pageSize=100', 'GET', params)
}

function leave_message(params) { // 留言接口
  http('/mini/leaveMessage', 'POST', params)
}

// 每一个接口定义一个函数，然后暴露出去，供逻辑代码调用
export default { // 暴露接口
  login,
  unfinished,
  finished,
  reserve_detail,
  reserve,
  userinfo,
  message,
  leave_message
}