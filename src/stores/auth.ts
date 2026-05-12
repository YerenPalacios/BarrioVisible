import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { ROLE_PERMISSIONS, canAccessRouteRole } from '@/constants/rbac'
import { authenticateMockUser } from '@/mock/authUsers'
import type { AuthUser, AuthenticatedRole, Permission, UserRole } from '@/types/auth'

const STORAGE_KEY = 'bv-auth-session'

interface PersistedPayload {
  user: AuthUser
  token: string
}

function readStorage(): PersistedPayload | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as PersistedPayload
    if (!data?.user?.email || !data?.user?.role || !data?.token) return null
    return data
  } catch {
    return null
  }
}

function writeStorage(payload: PersistedPayload | null) {
  if (!payload) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

function makeMockToken(user: AuthUser): string {
  return `mock.${btoa(`${user.email}:${user.role}:${Date.now()}`)}`
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(null)
  const restored = ref(false)

  const isAuthenticated = computed(() => user.value !== null && token.value !== null)

  const effectiveRole = computed<UserRole>(() =>
    user.value ? user.value.role : 'publico',
  )

  function hasPermission(permission: Permission): boolean {
    if (user.value?.role === 'admin') return true
    const role = effectiveRole.value
    return ROLE_PERMISSIONS[role].includes(permission)
  }

  function matchesRouteRoles(allowed: readonly AuthenticatedRole[]): boolean {
    return canAccessRouteRole(user.value?.role ?? null, allowed)
  }

  function restoreFromStorage() {
    if (restored.value) return
    restored.value = true
    const data = readStorage()
    if (!data) return
    user.value = data.user
    token.value = data.token
  }

  async function login(email: string, password: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 180))
    const u = authenticateMockUser(email, password)
    if (!u) return false
    const t = makeMockToken(u)
    user.value = u
    token.value = t
    writeStorage({ user: u, token: t })
    return true
  }

  function logout() {
    user.value = null
    token.value = null
    writeStorage(null)
  }

  return {
    user,
    token,
    restored,
    isAuthenticated,
    effectiveRole,
    hasPermission,
    matchesRouteRoles,
    restoreFromStorage,
    login,
    logout,
  }
})
