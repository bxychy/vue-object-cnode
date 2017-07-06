// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'

import axios from 'axios'
axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
axios.defaults.timeout = '10000'
Vue.prototype.$http = axios

//Vue.config.productionTip = false

//时间过滤器-年月日时分秒
Vue.filter('getTime',(val)=>{
  var localTime = new Date().getTime()
  var createTime = new Date(val).getTime()
  var totalTime = (localTime - createTime) / 1000
  var day = parseInt(totalTime/(24*60*60))
  var month = parseInt(day/30)
  var year = parseInt(day/364)
  var hour = parseInt((totalTime - day*24*60*60)/(60*60))
  var minute = parseInt((totalTime - day*24*60*60 - hour*60*60)/60)
  var second = parseInt(totalTime - day*24*60*60 - hour*60*60 - minute*60)
  if(day){
    if(year){
      return `${year}年前`
    }else if(month){
      return `${month}个月前`
    }else{
      return `${day}天前`
    }
  }else if(hour){
    return `${hour}小时前`
  }else if(minute){
    return `${minute}分钟前`
  }else{
    return `${second}秒钟前`
  }
})

//时间过滤器-具体时间
Vue.filter('getTimeShow',(val)=>{
	var date = new Date(val),
	Y = date.getFullYear(),
	m = date.getMonth() + 1,
	d = date.getDate(),
	H = date.getHours(),
	i = date.getMinutes(),
	s = date.getSeconds();
	if(m < 10) {
		m = '0' + m;
	}
	if(d < 10) {
		d = '0' + d;
	}
	if(H < 10) {
		H = '0' + H;
	}
	if(i < 10) {
		i = '0' + i;
	}
	if(s < 10) {
		s = '0' + s;
	}
//	<!-- 获取时间格式 2017-01-03 10:13:48 -->
 	var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
//	<!-- 获取时间格式 2017-01-03 -->
//	var t = Y + '-' + m + '-' + d;
	return t;
});

//导航过滤器
Vue.filter('getTabName',(val,isTop,isGood)=>{
  var tabName = {
    'top'   : '置顶',
    'good'  : '精华',
    'share' : '分享',
    'ask'   : '问答',
    'job'   : '招聘'
  }
  if(isTop){
    return tabName["top"]
  }else if(isGood){
    return tabName["good"]
  }else{
    return tabName[val]
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
	router,
	data: {
    eventHub: new Vue()
 	},
  template: '<App/>',
  components: { App }
})
