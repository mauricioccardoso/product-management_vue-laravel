import LoginForm from '@/components/AuthView/LoginForm.vue'
import AuthView from '@/views/AuthView.vue'
import HomeView from '@/views/HomeView.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: ReadonlyArray<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeView
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: '/login',
    component: AuthView,
    meta: { isGuest: true },
    children: [
      {
        path: '/login',
        name: 'login',
        component: LoginForm
      }
    ]
  }
]
