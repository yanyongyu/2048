/* global Vue */
import Game from '@/views/Game'
import Home from '@/views/Home'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
      props: (route) => ({
        width: route.query.w,
        height: route.query.h
      })
    }
  ]
})
