import Toast from '../../../static/vant/toast/toast'
import Vue from 'vue'

export default {
  // 关于接口loading的配置
  loading: {
    limitTime: 400, // 接口请求在xxxms内完成则不展示loading
    loadingShow: () => {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    },
    loadingHide: () => {
      wx.hideLoading()
    }
  },
  // 接口请求的默认配置
  reqConfig: {
    isLoading: true, // 是否展示loading，默认为true
    isErrorDefaultTip: true, // 是否展示默认错误提示，默认为true
    errorAction: true // 是否使用自定义的错误处理方法，默认为false，如设置true则需在views层catch错误
  },
  // fly的默认配置
  flyConfig: {
    method: 'post'
  },
  // 运行成功的判别标识
  resSuccess: {
    key: 'code', // 与后台规定的表示响应成功的变量
    value: 200 // 与后台规定的表示响应成功code
  },
  // 异常情况
  resError: {
    // 异常默认提示的方法
    tipShow: (error) => {
      console.log('error:' + error)
      if (error.code === 991 || error.code === '991') {
        Toast('登录失效,请重新登录')
        Vue.prototype.$store.isLogin = false
        Vue.prototype.$store.token = ''
        Vue.prototype.$store.userInfo = {}
      } else if (error.code === 500) {
        Toast(error.message)
      } else {
        Toast('服务器开小差,稍后重试')
      }
    }
  }
}
