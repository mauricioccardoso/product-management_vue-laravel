import LoginForm from '@/components/AuthView/LoginForm.vue'
import AuthView from '@/views/AuthView.vue'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView/ProductsView.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: ReadonlyArray<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'products',
    component: HomeView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/products',
        name: 'products',
        component: ProductsView
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
