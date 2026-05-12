<template>
  <div class="mx-auto max-w-7xl space-y-8 pb-10">
    <header class="flex flex-col gap-4 border-b border-brand-navy/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-medium uppercase tracking-wide text-brand-teal">
          Administración
        </p>
        <h1 class="mt-1 text-2xl font-bold text-brand-navy md:text-3xl">
          Panel de control
        </h1>
        <p class="mt-2 max-w-2xl text-slate-600">
          Resumen operativo de problemáticas (datos mock). Sin integración a backend.
        </p>
      </div>
      <div class="rounded-lg border border-brand-navy/10 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
        <p class="font-medium text-brand-navy">
          Sesión
        </p>
        <p class="mt-1">
          {{ user?.displayName ?? '—' }}
        </p>
        <p class="text-xs text-slate-500">
          {{ user?.email }}
        </p>
      </div>
    </header>

    <section
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Indicadores"
    >
      <article class="rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm">
        <p class="text-sm font-medium text-slate-500">
          Reportes totales
        </p>
        <p class="mt-2 text-3xl font-semibold tabular-nums text-brand-navy">
          {{ problematicas.total }}
        </p>
      </article>
      <article class="rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm">
        <p class="text-sm font-medium text-slate-500">
          Activos (abierto / revisión / curso)
        </p>
        <p class="mt-2 text-3xl font-semibold tabular-nums text-brand-teal">
          {{ problematicas.reportesActivos }}
        </p>
      </article>
      <article class="rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm">
        <p class="text-sm font-medium text-slate-500">
          Alta y crítica sin cerrar
        </p>
        <p class="mt-2 text-3xl font-semibold tabular-nums text-brand-navy">
          {{ problematicas.reportesUrgentes }}
        </p>
      </article>
      <article class="rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm">
        <p class="text-sm font-medium text-slate-500">
          Localidades distintas
        </p>
        <p class="mt-2 text-3xl font-semibold tabular-nums text-brand-green">
          {{ problematicas.localidadesPresentes.length }}
        </p>
      </article>
    </section>

    <div class="grid gap-6 lg:grid-cols-2">
      <section
        class="rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm"
        aria-labelledby="hdr-estado"
      >
        <h2
          id="hdr-estado"
          class="text-lg font-semibold text-brand-navy"
        >
          Por estado
        </h2>
        <ul class="mt-4 space-y-3">
          <li
            v-for="estado in ordenEstados"
            :key="estado"
            class="flex items-center gap-3"
          >
            <span class="w-36 shrink-0 text-sm text-slate-600">
              {{ ESTADO_LABELS[estado] }}
            </span>
            <div class="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full bg-brand-green transition-[width]"
                :style="{ width: barraPct(problematicas.conteoPorEstado[estado]) }"
              />
            </div>
            <span class="w-8 shrink-0 text-right text-sm font-medium tabular-nums text-slate-900">
              {{ problematicas.conteoPorEstado[estado] }}
            </span>
          </li>
        </ul>
      </section>

      <section
        class="rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm"
        aria-labelledby="hdr-prioridad"
      >
        <h2
          id="hdr-prioridad"
          class="text-lg font-semibold text-brand-navy"
        >
          Por prioridad
        </h2>
        <ul class="mt-4 space-y-3">
          <li
            v-for="prioridad in ordenPrioridad"
            :key="prioridad"
            class="flex items-center gap-3"
          >
            <span class="w-28 shrink-0 text-sm text-slate-600">
              {{ PRIORIDAD_LABELS[prioridad] }}
            </span>
            <div class="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                class="h-full rounded-full bg-brand-yellow transition-[width]"
                :style="{ width: barraPct(problematicas.conteoPorPrioridad[prioridad]) }"
              />
            </div>
            <span class="w-8 shrink-0 text-right text-sm font-medium tabular-nums text-slate-900">
              {{ problematicas.conteoPorPrioridad[prioridad] }}
            </span>
          </li>
        </ul>
      </section>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <section
        class="rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm"
        aria-labelledby="hdr-cat"
      >
        <h2
          id="hdr-cat"
          class="text-lg font-semibold text-brand-navy"
        >
          Por categoría
        </h2>
        <ul class="mt-4 divide-y divide-slate-100">
          <li
            v-for="row in problematicas.resumenPorCategoria"
            :key="row.categoria"
            class="flex items-center justify-between gap-3 py-2 first:pt-0"
          >
            <span class="text-sm text-slate-700">
              {{ CATEGORIA_LABELS[row.categoria] }}
            </span>
            <span class="text-sm font-semibold tabular-nums text-slate-900">
              {{ row.count }}
            </span>
          </li>
        </ul>
      </section>

      <section
        class="rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm"
        aria-labelledby="hdr-loc"
      >
        <h2
          id="hdr-loc"
          class="text-lg font-semibold text-brand-navy"
        >
          Por localidad
        </h2>
        <ul class="mt-4 divide-y divide-slate-100">
          <li
            v-for="row in problematicas.resumenPorLocalidad"
            :key="row.localidad"
            class="flex items-center justify-between gap-3 py-2 first:pt-0"
          >
            <span class="text-sm text-slate-700">
              {{ row.localidad }}
            </span>
            <span class="text-sm font-semibold tabular-nums text-slate-900">
              {{ row.count }}
            </span>
          </li>
        </ul>
      </section>
    </div>

    <section
      class="rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm"
      aria-labelledby="hdr-recientes"
    >
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id="hdr-recientes"
          class="text-lg font-semibold text-brand-navy"
        >
          Últimos reportes
        </h2>
        <RouterLink
          to="/explorar"
          class="text-sm font-medium text-brand-teal hover:text-brand-navy"
        >
          Ver listado público →
        </RouterLink>
      </div>
      <div class="mt-4 overflow-x-auto">
        <table class="w-full min-w-[36rem] text-left text-sm">
          <thead>
            <tr class="border-b border-slate-200 text-slate-500">
              <th class="pb-2 pr-4 font-medium">
                Título
              </th>
              <th class="pb-2 pr-4 font-medium">
                Localidad
              </th>
              <th class="pb-2 pr-4 font-medium">
                Estado
              </th>
              <th class="pb-2 pr-4 font-medium">
                Prioridad
              </th>
              <th class="pb-2 font-medium">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="r in recientes"
              :key="r.id"
            >
              <td class="py-3 pr-4">
                <RouterLink
                  :to="{ name: 'problematica-detalle', params: { id: r.id } }"
                  class="font-medium text-brand-teal hover:text-brand-navy"
                >
                  {{ r.titulo }}
                </RouterLink>
              </td>
              <td class="py-3 pr-4 text-slate-600">
                {{ r.localidad }}
              </td>
              <td class="py-3 pr-4 text-slate-600">
                {{ ESTADO_LABELS[r.estado] }}
              </td>
              <td class="py-3 pr-4 text-slate-600">
                {{ PRIORIDAD_LABELS[r.prioridad] }}
              </td>
              <td class="py-3 text-slate-500">
                {{ formatFechaCorta(r.fecha) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section
      class="grid gap-6 lg:grid-cols-2"
      aria-label="Herramientas mock"
    >
      <div class="rounded-xl border border-dashed border-brand-teal/30 bg-brand-surface p-5">
        <h2 class="text-lg font-semibold text-brand-navy">
          Cola simulada
        </h2>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed">
          En producción aquí podrían mostrarse derivaciones a Acueducto, UMV o
          Policía. Por ahora es texto fijo: no hay colas reales ni webhooks.
        </p>
        <ul class="mt-3 list-inside list-disc text-sm text-slate-600">
          <li>3 tickets mock “en espera de proveedor”</li>
          <li>1 inspección programada (simulada) para esta semana</li>
        </ul>
      </div>
      <div class="rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm">
        <h2 class="text-lg font-semibold text-brand-navy">
          Datos de demostración
        </h2>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed">
          Restaura el arreglo original de reportes mock en memoria (útil si
          probaste cambios locales en el store).
        </p>
        <button
          type="button"
          class="mt-4 rounded-lg border border-brand-teal bg-brand-teal px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy"
          @click="onReiniciarMock"
        >
          Reiniciar dataset mock
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import {
  CATEGORIA_LABELS,
  ESTADO_LABELS,
  PRIORIDAD_LABELS,
} from '@/constants/problematicaLabels'
import { useAuthStore } from '@/stores/auth'
import { useProblematicasStore } from '@/stores/problematicas'
import type { EstadoReporte, PrioridadReporte } from '@/types/problematica'

const auth = useAuthStore()
const { user } = storeToRefs(auth)

const problematicas = useProblematicasStore()

const ordenEstados: EstadoReporte[] = [
  'abierto',
  'en_revision',
  'en_curso',
  'resuelto',
  'cerrado',
]

const ordenPrioridad: PrioridadReporte[] = ['critica', 'alta', 'media', 'baja']

const recientes = computed(() => problematicas.ordenadosPorFecha(true).slice(0, 8))

function barraPct(valor: number): string {
  const t = problematicas.total
  if (t <= 0) return '0%'
  return `${Math.min(100, Math.round((valor / t) * 100))}%`
}

function formatFechaCorta(iso: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
  }).format(new Date(iso))
}

function onReiniciarMock() {
  if (window.confirm('¿Restaurar el dataset mock original de reportes?')) {
    problematicas.reiniciarMock()
  }
}
</script>
