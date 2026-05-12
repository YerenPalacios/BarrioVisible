import type { AuthUser, AuthenticatedRole } from '@/types/auth'

const MOCK_PASSWORDS: Record<string, { password: string; role: AuthenticatedRole; displayName: string }> = {
  'admin@barriovisible.com': {
    password: 'admin123',
    role: 'admin',
    displayName: 'Administrador',
  },
  'estudiante@barriovisible.com': {
    password: 'estudiante123',
    role: 'estudiante',
    displayName: 'Estudiante demo',
  },
}

/**
 * Autenticación mock: sin red ni backend.
 * Usuario **publico** = sin sesión (no hay credenciales mock para “público”).
 */
export function authenticateMockUser(
  email: string,
  password: string,
): AuthUser | null {
  const key = email.trim().toLowerCase()
  const row = MOCK_PASSWORDS[key]
  if (!row || row.password !== password) return null
  return {
    email: key,
    displayName: row.displayName,
    role: row.role,
  }
}
