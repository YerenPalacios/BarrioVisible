<template>
  <section
    class="home-fade-up relative overflow-hidden rounded-3xl border border-brand-navy/10 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-teal px-8 py-14 text-center shadow-2xl shadow-brand-navy/25 sm:px-12"
    style="animation-delay: 0.22s"
    aria-labelledby="home-cta-final-titulo"
  >
    <div
      class="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-brand-yellow/20 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-2xl">
      <h2
        id="home-cta-final-titulo"
        class="text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        Ayuda a visibilizar los problemas de tu comunidad
      </h2>
      <p class="mt-4 text-lg text-white/85">
        Cada reporte suma contexto geográfico y narrativo para incidir con evidencia — GovTech moderno, hecho para la calle.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <RouterLink
          to="/explorar"
          class="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-surface"
        >
          Explorar plataforma
        </RouterLink>
        <RouterLink
          to="/mapa"
          class="inline-flex items-center justify-center rounded-2xl border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
        >
          Ver mapa
        </RouterLink>
        <RouterLink
          v-if="!isAuthenticated"
          to="/login"
          class="inline-flex items-center justify-center rounded-2xl bg-brand-yellow px-6 py-3.5 text-sm font-semibold text-brand-navy shadow-lg transition hover:-translate-y-0.5 hover:brightness-105"
        >
          Iniciar sesión
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  isAuthenticated: boolean
}>()
</script>
