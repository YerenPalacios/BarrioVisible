<template>
  <div class="mx-auto max-w-7xl space-y-8 pb-10">
    <div
      v-if="toast.visible"
      class="fixed right-4 top-4 z-30 max-w-sm rounded-2xl border px-4 py-3 shadow-lg backdrop-blur"
      :class="toast.kind === 'success'
        ? 'border-emerald-200 bg-emerald-50/95 text-emerald-900'
        : 'border-rose-200 bg-rose-50/95 text-rose-900'"
      role="status"
      aria-live="polite"
    >
      <div class="flex items-start gap-3">
        <span
          class="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          :class="toast.kind === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'"
          aria-hidden="true"
        >
          <svg
            v-if="toast.kind === 'success'"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 10l3 3 7-7"
            />
          </svg>
          <svg
            v-else
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 6l8 8M14 6l-8 8"
            />
          </svg>
        </span>
        <div class="min-w-0">
          <p class="text-sm font-semibold">
            {{ toast.title }}
          </p>
          <p class="mt-0.5 text-xs leading-relaxed opacity-90">
            {{ toast.message }}
          </p>
        </div>
      </div>
    </div>

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
      aria-labelledby="hdr-reportes"
    >
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id="hdr-reportes"
          class="text-lg font-semibold text-brand-navy"
        >
          Reportes editables
        </h2>
        <RouterLink
          to="/explorar"
          class="text-sm font-medium text-brand-teal hover:text-brand-navy"
        >
          Ver listado público →
        </RouterLink>
      </div>
      <div class="mt-4 overflow-x-auto">
        <table class="w-full min-w-[72rem] text-left text-sm">
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
              <th class="pb-2 pr-4 font-medium">
                Fecha
              </th>
              <th class="pb-2 pr-4 font-medium">
                Vista
              </th>
              <th class="pb-2 font-medium">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="r in reportesAdmin"
              :key="r.id"
              class="align-middle"
            >
              <td class="py-3 pr-4 align-middle">
                <input
                  :id="`titulo-${r.id}`"
                  v-model="drafts[r.id].titulo"
                  type="text"
                  class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-brand-navy shadow-sm focus:border-brand-teal/50 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                >
              </td>
              <td class="py-3 pr-4 align-middle text-slate-600">
                {{ r.localidad }}
              </td>
              <td class="py-3 pr-4 align-middle">
                <select
                  v-model="drafts[r.id].estado"
                  class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-brand-navy shadow-sm focus:border-brand-teal/50 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                >
                  <option
                    v-for="estado in ordenEstados"
                    :key="estado"
                    :value="estado"
                  >
                    {{ ESTADO_LABELS[estado] }}
                  </option>
                </select>
              </td>
              <td class="py-3 pr-4 align-middle">
                <select
                  v-model="drafts[r.id].prioridad"
                  class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-brand-navy shadow-sm focus:border-brand-teal/50 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
                >
                  <option
                    v-for="prioridad in ordenPrioridad"
                    :key="prioridad"
                    :value="prioridad"
                  >
                    {{ PRIORIDAD_LABELS[prioridad] }}
                  </option>
                </select>
              </td>
              <td class="py-3 pr-4 align-middle text-slate-500">
                {{ formatFechaCorta(r.fecha) }}
              </td>
              <td class="py-3 pr-4 align-middle">
                <RouterLink
                  :to="{ name: 'problematica-detalle', params: { id: r.id } }"
                  class="font-medium text-brand-teal hover:text-brand-navy"
                >
                  Abrir
                </RouterLink>
              </td>
              <td class="py-3 align-middle">
                <div class="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full border border-brand-teal bg-brand-teal px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:border-brand-navy hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-70"
                    :disabled="isSaving[r.id]"
                    @click="guardarFila(r.id)"
                  >
                    <svg
                      v-if="isSaving[r.id]"
                      class="h-3.5 w-3.5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="3"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
                      />
                    </svg>
                    <svg
                      v-else
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 10l3.5 3.5L15 7"
                      />
                    </svg>
                    <span>{{ isSaving[r.id] ? 'Guardando…' : 'Guardar cambios' }}</span>
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-semibold text-rose-700 shadow-sm transition hover:border-rose-300 hover:bg-rose-50"
                    @click="confirmarEliminar(r.id)"
                  >
                    <svg
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 6h8m-6 0V4.5A1.5 1.5 0 019.5 3h1A1.5 1.5 0 0112 4.5V6m-6 0l.5 10.5A1.5 1.5 0 008 18h4a1.5 1.5 0 001.5-1.5L14 6M8.5 9.5v5M11.5 9.5v5"
                      />
                    </svg>
                    Borrar
                  </button>
                </div>
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
import { computed, reactive, watch } from 'vue'

import {
  CATEGORIA_LABELS,
  ESTADO_LABELS,
  PRIORIDAD_LABELS,
} from '@/constants/problematicaLabels'
import { useAuthStore } from '@/stores/auth'
import { useProblematicasStore } from '@/stores/problematicas'
import type { EstadoReporte, PrioridadReporte, ReporteProblematica } from '@/types/problematica'

type ToastKind = 'success' | 'error'

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

const reportesAdmin = computed(() => problematicas.ordenadosPorFecha(true))

const drafts = reactive<
  Record<string, Pick<ReporteProblematica, 'titulo' | 'estado' | 'prioridad'>>
>({})
const isSaving = reactive<Record<string, boolean>>({})
const toast = reactive<{
  visible: boolean
  kind: ToastKind
  title: string
  message: string
}>({
  visible: false,
  kind: 'success',
  title: '',
  message: '',
})
let toastTimer: number | null = null

function syncDrafts() {
  for (const r of reportesAdmin.value) {
    drafts[r.id] = {
      titulo: r.titulo,
      estado: r.estado,
      prioridad: r.prioridad,
    }
    if (isSaving[r.id] == null) isSaving[r.id] = false
  }
}

watch(
  reportesAdmin,
  () => {
    syncDrafts()
  },
  { immediate: true },
)

function guardarFila(id: string) {
  const draft = drafts[id]
  if (!draft) return
  const titulo = draft.titulo.trim()
  if (!titulo) {
    window.alert('El título no puede quedar vacío.')
    return
  }
  isSaving[id] = true
  const ok = problematicas.actualizarReporte(id, {
    titulo,
    estado: draft.estado,
    prioridad: draft.prioridad,
  })
  isSaving[id] = false
  if (!ok) {
    showToast('error', 'No se pudo actualizar', 'No se pudo actualizar el reporte.')
    return
  }
  showToast('success', 'Reporte actualizado', `Se guardaron los cambios en "${titulo}".`)
  syncDrafts()
}

function confirmarEliminar(id: string) {
  const reporte = problematicas.reportePorId(id)
  if (!reporte) return
  const ok = window.confirm(
    `¿Eliminar el reporte "${reporte.titulo}"? Esta acción no se puede deshacer.`,
  )
  if (!ok) return
  const removed = problematicas.eliminarReporte(id)
  if (!removed) {
    showToast('error', 'No se pudo eliminar', 'No se pudo eliminar el reporte.')
    return
  }
  delete drafts[id]
  delete isSaving[id]
  showToast('success', 'Reporte eliminado', `El reporte "${reporte.titulo}" fue eliminado.`)
}

function showToast(kind: ToastKind, title: string, message: string) {
  toast.visible = true
  toast.kind = kind
  toast.title = title
  toast.message = message
  if (toastTimer != null) {
    window.clearTimeout(toastTimer)
  }
  toastTimer = window.setTimeout(() => {
    toast.visible = false
    toastTimer = null
  }, 2500)
}

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
