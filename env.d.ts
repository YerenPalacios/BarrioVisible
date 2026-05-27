/// <reference types="vite/client" />

import type { AuthenticatedRole, Permission } from './src/types/auth'

interface ImportMetaEnv {
  /** URL del proyecto Supabase (ej. https://xxxx.supabase.co). */
  readonly VITE_SUPABASE_URL?: string
  /** Clave publishable del proyecto Supabase. */
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string
  /** Número WhatsApp sin + (ej. 573015551234). Opcional; si falta se usa un demo en local. */
  readonly VITE_WHATSAPP_REPORT_E164?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module '*.png' {
  const src: string
  export default src
}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    guestOnly?: boolean
    roles?: AuthenticatedRole[]
    permissions?: Permission[]
  }
}
