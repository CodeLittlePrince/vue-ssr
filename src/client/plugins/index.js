import Vue from 'vue'
if (process.env.NODE_ENV !== 'production') {
  import('./mock-switch')
}
import ajax from './ajax'

// vue use插件
Vue.use(ajax)
