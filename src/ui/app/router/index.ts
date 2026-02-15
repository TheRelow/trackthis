import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/pages',
    component: () => import('@/pages/pages.vue'),
    children: [
      {
        path: '',
        name: 'Pages',
        component: () => import('@/pages/pages/index.vue'),
      },
      {
        path: ':id',
        name: 'Detail page',
        component: () => import('@/pages/pages/detail.vue'),
      },
    ]
  },
  {
    path: '/domains',
    component: () => import('@/pages/domains.vue'),
    children: [
      {
        path: '',
        name: 'Domains',
        component: () => import('@/pages/domains/index.vue'),
      },
      {
        path: ':id',
        name: 'Detail domain',
        component: () => import('@/pages/domains/detail.vue'),
      },
    ]
  },
]

const index = createRouter({
  history: createWebHashHistory(),
  routes
})

export default index
