<template>
  <section
    class="home-fade-up"
    style="animation-delay: 0.06s"
    aria-labelledby="home-metricas-titulo"
  >
    <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2
          id="home-metricas-titulo"
          class="text-2xl font-bold tracking-tight text-brand-navy"
        >
          Panorama en tiempo real
        </h2>
        <p class="mt-1 max-w-xl text-slate-600">
          Indicadores agregados del dataset mock — listos para conectar a fuentes oficiales o APIs comunitarias.
        </p>
      </div>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <template v-if="!ready">
        <div
          v-for="i in 4"
          :key="i"
          class="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
        >
          <div class="h-4 w-24 animate-pulse rounded-md bg-slate-200" />
          <div class="mt-4 h-10 w-20 animate-pulse rounded-lg bg-slate-200" />
          <div class="mt-3 h-3 w-full animate-pulse rounded bg-slate-100" />
        </div>
      </template>
      <template v-else>
        <article
          class="group rounded-2xl border border-slate-100/90 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-teal/25 hover:shadow-lg"
        >
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-teal text-white shadow-inner transition group-hover:scale-105"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p class="mt-4 text-sm font-medium text-slate-500">
            Reportes registrados
          </p>
          <p class="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-brand-navy">
            {{ total }}
          </p>
          <p class="mt-2 text-xs text-slate-500">
            Casos documentados en el mock
          </p>
        </article>
        <article
          class="group rounded-2xl border border-slate-100/90 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-teal/25 hover:shadow-lg"
        >
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-brand-teal text-white shadow-inner transition group-hover:scale-105"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p class="mt-4 text-sm font-medium text-slate-500">
            Problemas resueltos
          </p>
          <p class="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-brand-navy">
            {{ resueltos }}
          </p>
          <p class="mt-2 text-xs text-slate-500">
            Estado “resuelto” en el sistema
          </p>
        </article>
        <article
          class="group rounded-2xl border border-slate-100/90 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-teal/25 hover:shadow-lg"
        >
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-teal to-brand-navy text-white shadow-inner transition group-hover:scale-105"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p class="mt-4 text-sm font-medium text-slate-500">
            Barrios monitoreados
          </p>
          <p class="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-brand-navy">
            {{ barrios }}
          </p>
          <p class="mt-2 text-xs text-slate-500">
            Localidades distintas en los datos
          </p>
        </article>
        <article
          class="group rounded-2xl border border-slate-100/90 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-teal/25 hover:shadow-lg"
        >
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-yellow to-amber-300 text-brand-navy shadow-inner transition group-hover:scale-105"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </div>
          <p class="mt-4 text-sm font-medium text-slate-500">
            Categorías activas
          </p>
          <p class="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-brand-navy">
            {{ categorias }}
          </p>
          <p class="mt-2 text-xs text-slate-500">
            Tipos de problemática presentes
          </p>
        </article>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  total: number
  resueltos: number
  barrios: number
  categorias: number
  ready: boolean
}>()
</script>
