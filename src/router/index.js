import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: {
      name: 'music'
    },
    meta: {
      isShow: true
    },
    component: () => import('@/views/Layout'),
    children: [{
        path: 'music',
        name: 'music',
        component: () => import('@/views/Music'),
        meta: {
          isShow: true
        }
      },
      {
        path: 'rank',
        name: 'rank',
        component: () => import('@/views/Rank'),
        meta: {
          isShow: true
        }
      },
      {
        path: 'songList',
        name: 'songList',
        component: () => import('@/views/SongList'),
        meta: {
          isShow: true
        }
      },
      {
        path: 'singer',
        name: 'singer',
        component: () => import('@/views/Singer'),
        meta: {
          isShow: true
        }
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/Video'),
        meta: {
          isShow: true
        }
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import('@/views/Personal'),
        meta: {
          isShow: true
        }
      },
      {
        path: 'singerInfo',
        name: 'singerInfo',
        component: () => import('@/views/Singer_info'),
        meta: {
          isShow: true
        }
      }
    ],
    
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      isShow: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
