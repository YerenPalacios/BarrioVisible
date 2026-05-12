/** Rol efectivo: sesión autenticada (admin | estudiante) o visitante (publico). */
export type UserRole = 'admin' | 'estudiante' | 'publico'

export type AuthenticatedRole = Exclude<UserRole, 'publico'>

export type Permission =
  | 'content.home'
  | 'content.explore'
  | 'aula.access'
  | 'admin.panel'
  | 'admin.users'

export interface AuthUser {
  email: string
  displayName: string
  role: AuthenticatedRole
}
