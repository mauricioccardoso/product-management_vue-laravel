import { createRouter, createWebHistory } from 'vue-router'

import { routes } from '@/router/routes'
import { configRoutesAuth } from './ConfigRoutesAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(configRoutesAuth)

export default router
