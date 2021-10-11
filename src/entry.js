/* global Vue */

/* weex initialized here, please do not move this line */
import App from '@/index'
import router from './router'

/* eslint-disable no-new */
new Vue(Vue.util.extend({ router }, App)).$mount('#root')
