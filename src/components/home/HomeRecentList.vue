<template>
  <section
    class="home-fade-up"
    style="animation-delay: 0.12s"
    aria-labelledby="home-recientes-titulo"
  >
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2
          id="home-recientes-titulo"
          class="text-2xl font-bold tracking-tight text-brand-navy"
        >
          Problemáticas recientes
        </h2>
        <p class="mt-1 text-slate-600">
          Casos reales del mock de Bogotá — prioriza transparencia y seguimiento.
        </p>
      </div>
      <RouterLink
        to="/explorar"
        class="text-sm font-semibold text-brand-teal hover:text-brand-navy"
      >
        Ver todas →
      </RouterLink>
    </div>

    <div class="mt-8 grid gap-5 md:grid-cols-2">
      <RouterLink
        v-for="r in reportes"
        :key="r.id"
        :to="{ name: 'problematica-detalle', params: { id: r.id } }"
        class="group flex flex-col rounded-2xl border border-slate-100/90 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-teal/30 hover:shadow-xl"
      >
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="rounded-full bg-brand-surface px-2.5 py-0.5 text-xs font-medium text-brand-navy ring-1 ring-brand-navy/10"
          >
            {{ CATEGORIA_LABELS[r.categoria] || r.categoria }}
          </span>
          <span
            class="rounded-full px-2.5 py-0.5 text-xs font-medium"
            :class="estadoVisual(r.estado).class"
          >
            {{ estadoVisual(r.estado).label }}
          </span>
          <span
            class="rounded-full px-2.5 py-0.5 text-xs font-medium"
            :class="prioridadChipClass(r.prioridad)"
          >
            {{ PRIORIDAD_LABELS[r.prioridad] }}
          </span>
        </div>
        <h3 class="mt-3 text-lg font-semibold leading-snug text-brand-navy group-hover:text-brand-teal">
          {{ r.titulo }}
        </h3>
        <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {{ r.descripcion }}
        </p>
        <div class="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span class="font-medium text-slate-600">{{ r.localidad }}</span>
          <time :datetime="r.fecha">{{ formatFechaCorta(r.fecha) }}</time>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CATEGORIA_LABELS, PRIORIDAD_LABELS } from '@/constants/problematicaLabels'
import type { ReporteProblematica } from '@/types/problematica'

import { estadoVisual, formatFechaCorta, prioridadChipClass } from './homeReportUi'

defineProps<{
  reportes: ReporteProblematica[]
}>()
</script>
