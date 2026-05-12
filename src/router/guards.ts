import type { Router } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

function safeRedirectPath(raw: unknown): string {
  if (typeof raw !== 'string' || !raw.startsWith('/') || raw.startsWith('//')) {
    return '/'
  }
  return raw
}

export function setupAuthGuards(router: Router) {
  router.beforeEach((to) => {
    const auth = useAuthStore()
    if (!auth.restored) auth.restoreFromStorage()

    if (to.meta.guestOnly && auth.isAuthenticated) {
      return safeRedirectPath(to.query.redirect)
    }

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
      return {
        name: 'login',
        query:
          to.fullPath !== '/login' ? { redirect: to.fullPath } : {},
      }
    }

    if (to.meta.roles?.length) {
      if (!auth.isAuthenticated) {
        return { name: 'login', query: { redirect: to.fullPath } }
      }
      if (!auth.matchesRouteRoles(to.meta.roles)) {
        return { name: 'home', query: { forbidden: '1' } }
      }
    }

    if (to.meta.permissions?.length) {
      const allowed = to.meta.permissions.every((p) => auth.hasPermission(p))
      if (!allowed) {
        if (!auth.isAuthenticated) {
          return { name: 'login', query: { redirect: to.fullPath } }
        }
        return { name: 'home', query: { forbidden: '1' } }
      }
    }

    return true
  })
}
