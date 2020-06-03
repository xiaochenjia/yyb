import Vue from 'vue'
import App from '@/App'
import IboxPlugin from '@/plugins/ibox'
import store from '@/store'
import WXP from 'minapp-api-promise'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(IboxPlugin)
Vue.use(MpvueRouterPatch)
Vue.prototype.$wx = WXP
Vue.config.productionTip = false

// 生产  wxf04b690f8b17dca0
// 开发  wxcfe9d376f7d9bf54
// 腾讯地图key 生产 SUMBZ-YLCCX-OGP4I-7U6M2-MXI5T-DVFGR  测试 SUMBZ-YLCCX-OGP4I-7U6M2-MXI5T-DVFGR
Vue.prototype.$qq_map_key = 'SUMBZ-YLCCX-OGP4I-7U6M2-MXI5T-DVFGR'
// 高德地图key 生产 7b8aadf8ffc9195efb37561f4cae1ae9 测试 0a3601095ca49a983c89819508e8c56e
Vue.prototype.$gaode_map_key = '7b8aadf8ffc9195efb37561f4cae1ae9'

const app = new Vue({
  mpType: 'app',
  store,
  ...App
})
app.$mount()
