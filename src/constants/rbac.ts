import type { AuthenticatedRole, Permission, UserRole } from '@/types/auth'

/** Permisos por rol (publico = sin iniciar sesión). */
export const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  publico: ['content.home', 'content.explore'],
  estudiante: [
    'content.home',
    'content.explore',
    'aula.access',
  ],
  admin: [
    'content.home',
    'content.explore',
    'aula.access',
    'admin.panel',
    'admin.users',
  ],
}

/** Rutas con `meta.roles`: el admin puede entrar también en zonas de estudiante. */
export function canAccessRouteRole(
  userRole: AuthenticatedRole | null,
  allowed: readonly AuthenticatedRole[],
): boolean {
  if (!userRole) return false
  if (userRole === 'admin') return true
  return allowed.includes(userRole)
}
