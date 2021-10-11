/* global Vue */

/* weex initialized here, please do not move this line */
import App from '@/index'
import { Plugin } from 'vue-fragment'
import router from './router'

Vue.use(Plugin)

/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router }, App))
