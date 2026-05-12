<template>
  <section
    class="home-fade-up"
    style="animation-delay: 0.18s"
    aria-labelledby="home-analytics-titulo"
  >
    <h2
      id="home-analytics-titulo"
      class="text-2xl font-bold tracking-tight text-brand-navy"
    >
      Análisis urbano
    </h2>
    <p class="mt-1 max-w-2xl text-slate-600">
      Mini panel con tendencias mock — útil para demos y talleres de datos abiertos.
    </p>

    <div class="mt-8 grid gap-6 lg:grid-cols-3">
      <div class="rounded-2xl border border-slate-100/90 bg-white p-6 shadow-sm lg:col-span-2">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Categorías más reportadas
        </h3>
        <ul class="mt-5 space-y-4">
          <li
            v-for="row in barras"
            :key="row.categoria"
            class="flex items-center gap-3"
          >
            <span class="w-[11.5rem] shrink-0 truncate text-xs font-medium text-slate-700 sm:text-sm">
              {{ CATEGORIA_LABELS[row.categoria] }}
            </span>
            <div class="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full bg-gradient-to-r from-brand-teal to-brand-green transition-all duration-500"
                :style="{ width: `${row.pct}%` }"
              />
            </div>
            <span class="w-8 shrink-0 text-right text-xs font-semibold tabular-nums text-brand-navy sm:text-sm">
              {{ row.count }}
            </span>
          </li>
        </ul>
      </div>

      <div class="rounded-2xl border border-slate-100/90 bg-white p-6 shadow-sm">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Tendencia semanal (mock)
        </h3>
        <p class="mt-2 text-xs text-slate-500">
          Reportes nuevos por día — datos simulados.
        </p>
        <div class="mt-6 flex h-36 items-stretch justify-between gap-1.5">
          <div
            v-for="d in semana"
            :key="d.label"
            class="flex min-h-0 flex-1 flex-col items-center justify-end gap-2"
          >
            <div
              class="w-full max-w-[2.25rem] rounded-t-md bg-gradient-to-t from-brand-navy/90 to-brand-teal/70 transition hover:opacity-90"
              :style="{ height: `${d.pct}%` }"
              :title="`${d.label}: ${d.reportes} reportes (mock)`"
            />
            <span class="text-[10px] font-medium text-slate-500 sm:text-xs">{{ d.label }}</span>
          </div>
        </div>

        <div class="mt-5 overflow-x-auto rounded-lg border border-slate-100">
          <table class="w-full min-w-[280px] text-left text-xs text-slate-600">
            <caption class="sr-only">
              Tendencia semanal de reportes nuevos, datos simulados
            </caption>
            <thead>
              <tr class="border-b border-slate-100 bg-slate-50/90 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                <th
                  scope="col"
                  class="px-2 py-2"
                >
                  Día
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-right tabular-nums"
                >
                  Nuevos
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-right tabular-nums"
                >
                  Acum.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, idx) in semana"
                :key="row.label"
                class="border-b border-slate-50 last:border-0"
              >
                <td class="px-2 py-1.5 font-medium text-brand-navy">
                  {{ row.label }}
                </td>
                <td class="px-2 py-1.5 text-right tabular-nums">
                  {{ row.reportes }}
                </td>
                <td class="px-2 py-1.5 text-right tabular-nums text-slate-500">
                  {{ semanaAcumulado[idx] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="rounded-2xl border border-brand-yellow/40 bg-gradient-to-br from-brand-yellow/15 to-white p-6 shadow-sm lg:col-span-3">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wide text-brand-navy/80">
              Zonas críticas (resumen)
            </h3>
            <p class="mt-1 max-w-3xl text-sm text-slate-700">
              Chapinero, Kennedy y centro histórico concentran alertas de movilidad e infraestructura en el mock — ideal para priorizar recorridos y mesas de trabajo.
            </p>
          </div>
          <div class="flex shrink-0 flex-wrap gap-2">
            <span class="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-brand-navy ring-1 ring-brand-navy/10">
              +{{ urgentes }} alta/crítica activa
            </span>
            <span class="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-brand-navy ring-1 ring-brand-navy/10">
              {{ localidades }} localidades
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { CATEGORIA_LABELS } from '@/constants/problematicaLabels'
import type { CategoriaProblematica } from '@/types/problematica'

const props = defineProps<{
  resumen: { categoria: CategoriaProblematica; count: number }[]
  urgentes: number
  localidades: number
}>()

const barras = computed(() => {
  const top = [...props.resumen].slice(0, 6)
  const max = Math.max(1, ...top.map((r) => r.count))
  return top.map((r) => ({
    ...r,
    pct: Math.round((r.count / max) * 100),
  }))
})

/** Mock semana actual: reportes nuevos por día y altura relativa para el mini gráfico. */
const semanaMock = [
  { label: 'Lun', reportes: 9 },
  { label: 'Mar', reportes: 12 },
  { label: 'Mié', reportes: 8 },
  { label: 'Jue', reportes: 15 },
  { label: 'Vie', reportes: 13 },
  { label: 'Sáb', reportes: 10 },
  { label: 'Dom', reportes: 6 },
] as const

const semana = computed(() => {
  const max = Math.max(1, ...semanaMock.map((d) => d.reportes))
  return semanaMock.map((d) => ({
    label: d.label,
    reportes: d.reportes,
    pct: Math.round((d.reportes / max) * 100),
  }))
})

const semanaAcumulado = computed(() => {
  let acc = 0
  return semanaMock.map((d) => {
    acc += d.reportes
    return acc
  })
})
</script>
