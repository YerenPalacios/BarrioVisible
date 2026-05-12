import { createRouter, createWebHistory } from 'vue-router'

import { setupAuthGuards } from './guards'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

setupAuthGuards(router)

export default router
