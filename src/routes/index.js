import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export function createRouter () {
    return new Router({
      mode: 'history',
      routes: [
        {
            path:'/',
            component:()=>import('@/pages/home')
        },
        {
            path:'/about',
            component:()=>import('@/pages/about')
        },
      ]
    })
  }
