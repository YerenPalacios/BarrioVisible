<template>
  <header
    class="sticky top-0 z-10 border-b border-brand-navy/10 bg-white/90 backdrop-blur"
  >
    <div
      class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6"
    >
      <RouterLink
        to="/"
        class="group flex items-center gap-2.5 text-lg font-semibold tracking-tight"
        aria-label="BarrioVisible — inicio"
      >
        <img
          :src="logoUrl"
          alt=""
          class="h-8 w-8 shrink-0 object-contain md:h-9 md:w-9"
          width="36"
          height="36"
        >
        <span>
          <span class="text-brand-navy transition-colors group-hover:text-brand-teal">Barrio</span><span class="text-brand-green">Visible</span>
        </span>
      </RouterLink>

      <nav
        class="hidden items-center gap-6 md:flex"
        aria-label="Principal"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-full border border-transparent px-3 py-1.5 text-sm font-medium transition"
          :class="isNavActive(link.to)
            ? 'border-brand-teal/20 bg-brand-teal/10 text-brand-navy ring-1 ring-brand-teal/15'
            : 'text-slate-600 hover:border-brand-navy/10 hover:bg-brand-surface hover:text-brand-navy'"
        >
          {{ link.label }}
        </RouterLink>
        <template v-if="!isAuthenticated">
          <RouterLink
            to="/login"
            class="text-sm font-medium text-brand-teal hover:text-brand-navy"
          >
            Iniciar sesión
          </RouterLink>
        </template>
        <template v-else>
          <span class="max-w-[10rem] truncate text-sm text-slate-500">
            {{ user?.displayName }}
          </span>
          <button
            type="button"
            class="text-sm font-medium text-slate-600 hover:text-brand-navy"
            @click="onLogout"
          >
            Salir
          </button>
        </template>
      </nav>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md p-2 text-brand-navy hover:bg-brand-surface md:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        aria-label="Abrir menú"
        @click="menuOpen = !menuOpen"
      >
        <span class="sr-only">Menú</span>
        <svg
          v-if="!menuOpen"
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div
      v-show="menuOpen"
      id="mobile-nav"
      class="border-t border-brand-navy/10 bg-white px-4 py-3 md:hidden"
    >
      <nav
        class="flex flex-col gap-3"
        aria-label="Principal móvil"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-lg border px-3 py-2 text-sm font-medium transition"
          :class="isNavActive(link.to)
            ? 'border-brand-teal/25 bg-brand-teal/10 text-brand-navy'
            : 'border-transparent text-slate-700 hover:border-brand-navy/10 hover:bg-brand-surface hover:text-brand-navy'"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated"
          to="/login"
          class="text-sm font-medium text-brand-teal"
          @click="menuOpen = false"
        >
          Iniciar sesión
        </RouterLink>
        <template v-else>
          <span class="text-sm text-slate-500">
            {{ user?.displayName }}
          </span>
          <button
            type="button"
            class="text-left text-sm font-medium text-slate-700 hover:text-brand-navy"
            @click="onLogoutMobile"
          >
            Salir
          </button>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import logoUrl from '@/assets/logo.png'

const menuOpen = ref(false)
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const { user, isAuthenticated } = storeToRefs(auth)

const navLinks = computed(() => {
  const base: { to: string; label: string }[] = [
    { to: '/', label: 'Inicio' },
    { to: '/explorar', label: 'Explorar' },
    { to: '/mapa', label: 'Mapa' },
  ]
  // if (auth.hasPermission('aula.access')) {
  //   base.push({ to: '/aula', label: 'Área estudiante' })
  // }
  if (auth.hasPermission('admin.panel')) {
    base.push({ to: '/admin', label: 'Admin' })
  }
  return base
})

function onLogout() {
  auth.logout()
  void router.push({ name: 'home' })
}

function onLogoutMobile() {
  menuOpen.value = false
  onLogout()
}

function isNavActive(to: string): boolean {
  if (to === '/') return route.name === 'home'
  if (to === '/explorar') {
    return route.name === 'explorar' || route.name === 'problematica-detalle'
  }
  if (to === '/mapa') return route.name === 'mapa'
  if (to === '/admin') return route.name === 'admin'
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>
