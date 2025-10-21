import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/pages',
    name: 'Pages',
    component: () => import('@/pages/pages.vue')
  },
  {
    path: '/domains',
    name: 'Domains',
    component: () => import('@/pages/domains.vue')
  },
]

const index = createRouter({
  history: createWebHashHistory(),
  routes
})

export default index