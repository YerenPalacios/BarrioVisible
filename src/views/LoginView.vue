<template>
  <div class="flex min-h-screen flex-col bg-brand-surface px-4 py-10">
    <div class="mx-auto w-full max-w-md">
      <h1 class="text-center text-2xl font-semibold text-brand-navy">
        Iniciar sesión
      </h1>
      <p class="mt-2 text-center text-sm text-slate-600">
        Entorno mock — sin servidor.
      </p>

      <form
        class="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        @submit.prevent="onSubmit"
      >
        <div>
          <label
            class="block text-sm font-medium text-slate-700"
            for="email"
          >
            Correo
          </label>
          <input
            id="email"
            v-model.trim="email"
            type="email"
            autocomplete="username"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
            required
          >
        </div>
        <div>
          <label
            class="block text-sm font-medium text-slate-700"
            for="password"
          >
            Contraseña
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal"
            required
          >
        </div>

        <p
          v-if="error"
          class="text-sm text-red-600"
          role="alert"
        >
          Credenciales incorrectas.
        </p>

        <button
          type="submit"
          class="flex w-full justify-center rounded-lg bg-brand-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="loading"
        >
          {{ loading ? 'Entrando…' : 'Entrar' }}
        </button>
      </form>

      <p class="mt-6 text-center text-xs text-slate-500">
        Cuentas demo: admin@barriovisible.com / admin123 —
        estudiante@barriovisible.com / estudiante123
      </p>
      <p class="mt-2 text-center text-xs text-slate-500">
        Visitantes sin sesión tienen rol
        <span class="font-medium text-brand-teal">publico</span>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(false)

function safeNextPath(): string {
  const raw = route.query.redirect
  if (typeof raw !== 'string' || !raw.startsWith('/') || raw.startsWith('//')) {
    return '/'
  }
  return raw
}

async function onSubmit() {
  error.value = false
  loading.value = true
  try {
    const ok = await auth.login(email.value, password.value)
    if (!ok) {
      error.value = true
      return
    }
    await router.replace(safeNextPath())
  } finally {
    loading.value = false
  }
}
</script>
