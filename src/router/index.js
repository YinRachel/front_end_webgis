import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/tokener'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/test',
      name: 'test',
      // route level code-splitting
      component: () => import('../components/InfoComponents/test.vue'),
    },
  ],
})

/*  */
/* router.beforeEach((to, from, next) => {
  const tokener = useTokenStore() */
/* 在主页面操作，根据姓名拿在线状态 */
// 读取token, 这里理论上需要验证一下token的合法性
/*   if (localStorage.getItem('traffictoken') == tokener.token) {
    if (to.path == '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  }
}) */
export default router
