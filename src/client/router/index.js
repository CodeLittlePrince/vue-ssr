import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import(/* webpackChunkName: "home" */ '../views/home')
const PageA = () => import(/* webpackChunkName: "pageA" */ '../views/pageA')
const PageB = () => import(/* webpackChunkName: "pageB" */ '../views/pageB')

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/pageA',
        component: PageA
      },
      {
        path: '/pageB',
        component: PageB
      },
    ]
  })
}