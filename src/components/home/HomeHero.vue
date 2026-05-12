<template>
  <section
    class="home-fade-up relative overflow-hidden rounded-3xl border border-brand-navy/8 bg-gradient-to-br from-white via-brand-surface/40 to-brand-teal/[0.07] px-6 py-14 shadow-[0_24px_80px_-24px_rgba(16,48,88,0.18)] sm:px-10 lg:px-14 lg:py-16"
  >
    <div
      class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-yellow/15 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-brand-teal/10 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
          Visualiza y reporta problemáticas reales de tu barrio
        </h1>
        <p class="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          Plataforma para registro vecinal, visualización urbana y análisis de datos comunitarios — con foco en transparencia y participación.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <RouterLink
            to="/explorar"
            class="inline-flex items-center justify-center rounded-2xl bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-navy/20 transition hover:-translate-y-0.5 hover:bg-brand-navy/90 hover:shadow-xl"
          >
            Ver problemáticas
          </RouterLink>
          <RouterLink
            to="/mapa"
            class="inline-flex items-center justify-center rounded-2xl border border-brand-navy/15 bg-white/90 px-6 py-3.5 text-sm font-semibold text-brand-navy shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-teal/40 hover:shadow-md"
          >
            Explorar mapa
          </RouterLink>
          <RouterLink
            v-if="!isAuthenticated"
            to="/login"
            class="inline-flex items-center justify-center rounded-2xl bg-brand-yellow px-6 py-3.5 text-sm font-semibold text-brand-navy shadow-md shadow-brand-yellow/30 transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Iniciar sesión
          </RouterLink>
        </div>

        <p
          v-if="isAuthenticated && sessionLabel"
          class="mt-6 text-sm text-slate-500"
        >
          Sesión:
          <span class="font-medium text-brand-navy">{{ sessionLabel }}</span>
          <span class="text-slate-400"> · </span>
          <span class="text-brand-teal">{{ effectiveRole }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { UserRole } from '@/types/auth'

defineProps<{
  isAuthenticated: boolean
  effectiveRole: UserRole
  sessionLabel?: string | null
}>()
</script>
