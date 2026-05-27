<template>
  <div class="mx-auto max-w-3xl">
    <h1 class="text-2xl font-bold text-brand-navy md:text-3xl">
      Explorar
    </h1>
    <p class="mt-2 text-slate-600">
      Reportes vecinales mock de Bogotá. Pulsa un título para ver el detalle.
    </p>

    <div
      v-if="temaActivo"
      class="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-brand-teal/30 bg-brand-teal/10 px-4 py-3 text-sm text-brand-navy"
      role="status"
    >
      <span>
        Eje desde la home:
        <strong class="font-semibold">{{ homeCategoryTitulo(temaActivo) }}</strong>
        — puedes afinar en «Filtros y orden».
      </span>
      <RouterLink
        :to="{ name: 'explorar', query: limpiarTemaQuery }"
        class="font-medium text-brand-teal underline decoration-brand-teal/40 underline-offset-2 hover:decoration-brand-teal"
      >
        Quitar eje
      </RouterLink>
    </div>

    <p
      v-else-if="temaQueryRaw"
      class="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
      role="status"
    >
      No reconocemos el filtro «{{ temaQueryRaw }}». Mostrando todos los reportes.
    </p>

    <details
      class="explorar-filtros-detalles mt-5 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100/80"
      aria-label="Filtros y ordenación de resultados"
    >
      <summary
        class="flex cursor-pointer list-none items-center gap-2.5 px-3 py-2.5 marker:content-none sm:gap-3 sm:px-4 [&::-webkit-details-marker]:hidden"
      >
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-brand-navy ring-1 ring-slate-200/80"
          aria-hidden="true"
        >
          <svg
            class="h-[18px] w-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
          >
            <path
              stroke-linecap="round"
              d="M4 6h16M7 12h10M10 18h4"
            />
            <circle
              cx="17"
              cy="6"
              r="1.5"
              fill="currentColor"
              stroke="none"
            />
            <circle
              cx="14"
              cy="12"
              r="1.5"
              fill="currentColor"
              stroke="none"
            />
            <circle
              cx="8"
              cy="18"
              r="1.5"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </span>
        <span class="min-w-0 flex-1">
          <span class="block text-sm font-semibold leading-tight text-brand-navy">
            Filtros y orden
          </span>
          <span class="mt-0.5 block truncate text-xs text-slate-500">
            {{ lista.length }} {{ lista.length === 1 ? 'resultado' : 'resultados' }}
            <span class="text-slate-400">·</span>
            {{ etiquetaOrdenCorta }}
          </span>
        </span>
        <span
          v-if="criteriosActivos > 0"
          class="shrink-0 rounded-full bg-brand-teal/15 px-2 py-0.5 text-xs font-semibold text-brand-teal"
          title="Criterios distintos del valor por defecto"
        >
          {{ criteriosActivos }}
        </span>
        <svg
          class="explorar-filtros-chevron h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>

      <div class="border-t border-slate-200/80 bg-slate-50/70 px-3 pb-3 pt-3 sm:px-4">
        <div class="grid gap-3 sm:grid-cols-2">
          <label class="flex flex-col gap-1">
            <span class="text-[11px] font-medium uppercase tracking-wide text-slate-500">Localidad</span>
            <select
              v-model="filtroLocalidad"
              class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-brand-navy shadow-sm focus:border-brand-teal/50 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
            >
              <option value="">
                Todas
              </option>
              <option
                v-for="loc in store.localidadesPresentes"
                :key="loc"
                :value="loc"
              >
                {{ loc }}
              </option>
            </select>
          </label>

          <label class="flex flex-col gap-1">
            <span class="text-[11px] font-medium uppercase tracking-wide text-slate-500">Criticidad</span>
            <select
              v-model="filtroPrioridad"
              class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-brand-navy shadow-sm focus:border-brand-teal/50 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
            >
              <option value="">
                Todas
              </option>
              <option
                v-for="p in prioridadesOrdenUi"
                :key="p"
                :value="p"
              >
                {{ PRIORIDAD_LABELS[p] }}
              </option>
            </select>
          </label>

          <label class="flex flex-col gap-1 sm:col-span-2">
            <span class="text-[11px] font-medium uppercase tracking-wide text-slate-500">Categoría</span>
            <select
              v-model="filtroCategoria"
              class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-brand-navy shadow-sm focus:border-brand-teal/50 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
            >
              <option value="">
                Todas
              </option>
              <option
                v-for="c in categoriasEnSelector"
                :key="c"
                :value="c"
              >
                {{ CATEGORIA_LABELS[c] || c }}
              </option>
            </select>
          </label>

          <label class="flex flex-col gap-1 sm:col-span-2">
            <span class="text-[11px] font-medium uppercase tracking-wide text-slate-500">Ordenar por</span>
            <select
              v-model="orden"
              class="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-brand-navy shadow-sm focus:border-brand-teal/50 focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
            >
              <option value="fecha_desc">
                Fecha: más reciente primero
              </option>
              <option value="fecha_asc">
                Fecha: más antigua primero
              </option>
              <option value="prioridad_desc">
                Criticidad: mayor primero
              </option>
              <option value="prioridad_asc">
                Criticidad: menor primero
              </option>
            </select>
          </label>
        </div>

        <div class="mt-3 flex justify-end">
          <button
            v-if="hayFiltrosOOrdenNoPorDefecto"
            type="button"
            class="text-sm font-medium text-brand-teal underline decoration-brand-teal/40 underline-offset-2 hover:decoration-brand-teal"
            @click="limpiarFiltrosYOrden"
          >
            Restablecer todo
          </button>
        </div>
      </div>
    </details>

    <p
      v-if="!lista.length"
      class="mt-8 rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-600"
    >
      No hay reportes que coincidan. Prueba relajar filtros o
      <button
        type="button"
        class="font-medium text-brand-teal underline decoration-brand-teal/40 underline-offset-2 hover:decoration-brand-teal"
        @click="limpiarFiltrosYOrden"
      >
        restablecer
      </button>.
    </p>

    <ul
      v-else
      class="mt-8 space-y-3"
    >
      <li
        v-for="r in lista"
        :key="r.id"
      >
        <RouterLink
          :to="{ name: 'problematica-detalle', params: { id: r.id } }"
          class="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-teal/50 hover:shadow-md"
        >
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-medium text-slate-500">
              {{ r.localidad }}
            </span>
            <span
              class="rounded-full border border-brand-navy/10 bg-slate-100 px-2 py-0.5 text-xs text-brand-navy"
            >
              {{ CATEGORIA_LABELS[r.categoria] || r.categoria }}
            </span>
            <span
              class="rounded-full px-2 py-0.5 text-xs"
              :class="prioridadClass(r.prioridad)"
            >
              {{ PRIORIDAD_LABELS[r.prioridad] }}
            </span>
          </div>
          <h2 class="mt-2 text-base font-semibold text-brand-navy">
            {{ r.titulo }}
          </h2>
          <p class="mt-1 line-clamp-2 text-sm text-slate-600">
            {{ r.descripcion }}
          </p>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import {
  HOME_TEMA_TO_CATEGORIAS,
  homeCategoryTitulo,
  isHomeTemaId,
} from '@/components/home/homeCategories'
import { CATEGORIA_LABELS, PRIORIDAD_LABELS } from '@/constants/problematicaLabels'
import { useProblematicasStore } from '@/stores/problematicas'
import type { CategoriaProblematica, PrioridadReporte, ReporteProblematica } from '@/types/problematica'

type OrdenExplorar = 'fecha_desc' | 'fecha_asc' | 'prioridad_desc' | 'prioridad_asc'

const route = useRoute()
const store = useProblematicasStore()

const PRIORIDAD_PESO: Record<PrioridadReporte, number> = {
  critica: 4,
  alta: 3,
  media: 2,
  baja: 1,
}

const prioridadesOrdenUi: PrioridadReporte[] = ['critica', 'alta', 'media', 'baja']

const todasCategorias = computed(() =>
  (Object.keys(CATEGORIA_LABELS) as CategoriaProblematica[]).sort((a, b) =>
    CATEGORIA_LABELS[a].localeCompare(CATEGORIA_LABELS[b], 'es'),
  ),
)

const temaQueryRaw = computed(() => {
  const raw = route.query.tema
  return typeof raw === 'string' && raw.trim() ? raw.trim() : null
})

const temaActivo = computed(() => {
  const q = temaQueryRaw.value
  return q && isHomeTemaId(q) ? q : null
})

const categoriasEnSelector = computed(() => {
  const tema = temaActivo.value
  if (!tema) return todasCategorias.value
  const delTema = HOME_TEMA_TO_CATEGORIAS[tema]
  return [...delTema].sort((a, b) =>
    CATEGORIA_LABELS[a].localeCompare(CATEGORIA_LABELS[b], 'es'),
  )
})

const filtroLocalidad = ref('')
const filtroPrioridad = ref<'' | PrioridadReporte>('')
const filtroCategoria = ref<'' | CategoriaProblematica>('')
const orden = ref<OrdenExplorar>('fecha_desc')

watch(temaActivo, (tema) => {
  const cat = filtroCategoria.value
  if (!cat || !tema) return
  const ok = new Set(HOME_TEMA_TO_CATEGORIAS[tema])
  if (!ok.has(cat)) filtroCategoria.value = ''
})

const limpiarTemaQuery = computed(() => {
  const q = { ...route.query } as Record<string, string | string[]>
  delete q.tema
  return q
})

const hayFiltrosOOrdenNoPorDefecto = computed(
  () =>
    Boolean(filtroLocalidad.value) ||
    Boolean(filtroPrioridad.value) ||
    Boolean(filtroCategoria.value) ||
    orden.value !== 'fecha_desc',
)

const criteriosActivos = computed(() => {
  let n = 0
  if (filtroLocalidad.value) n += 1
  if (filtroPrioridad.value) n += 1
  if (filtroCategoria.value) n += 1
  if (orden.value !== 'fecha_desc') n += 1
  return n
})

const etiquetaOrdenCorta = computed(() => {
  const m: Record<OrdenExplorar, string> = {
    fecha_desc: 'Más recientes',
    fecha_asc: 'Más antiguas',
    prioridad_desc: 'Criticidad alta primero',
    prioridad_asc: 'Criticidad baja primero',
  }
  return m[orden.value]
})

function limpiarFiltrosYOrden() {
  filtroLocalidad.value = ''
  filtroPrioridad.value = ''
  filtroCategoria.value = ''
  orden.value = 'fecha_desc'
}

function compararFecha(a: ReporteProblematica, b: ReporteProblematica): number {
  return new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
}

function compararPrioridad(a: ReporteProblematica, b: ReporteProblematica): number {
  return PRIORIDAD_PESO[a.prioridad] - PRIORIDAD_PESO[b.prioridad]
}

function aplicarOrden(items: ReporteProblematica[], o: OrdenExplorar): ReporteProblematica[] {
  const copy = [...items]
  switch (o) {
    case 'fecha_desc':
      copy.sort((a, b) => compararFecha(b, a) || a.id.localeCompare(b.id))
      break
    case 'fecha_asc':
      copy.sort((a, b) => compararFecha(a, b) || a.id.localeCompare(b.id))
      break
    case 'prioridad_desc':
      copy.sort((a, b) => compararPrioridad(b, a) || compararFecha(b, a) || a.id.localeCompare(b.id))
      break
    case 'prioridad_asc':
      copy.sort((a, b) => compararPrioridad(a, b) || compararFecha(b, a) || a.id.localeCompare(b.id))
      break
    default:
      break
  }
  return copy
}

const lista = computed(() => {
  let items = [...store.reportes]

  const tema = temaActivo.value
  if (tema) {
    const permitidas = new Set(HOME_TEMA_TO_CATEGORIAS[tema])
    items = items.filter((r) => permitidas.has(r.categoria))
  }

  const loc = filtroLocalidad.value.trim()
  if (loc) {
    items = items.filter((r) => r.localidad === loc)
  }

  const pri = filtroPrioridad.value
  if (pri) {
    items = items.filter((r) => r.prioridad === pri)
  }

  const cat = filtroCategoria.value
  if (cat) {
    items = items.filter((r) => r.categoria === cat)
  }

  return aplicarOrden(items, orden.value)
})

function prioridadClass(p: PrioridadReporte): string {
  const map: Record<PrioridadReporte, string> = {
    baja: 'bg-slate-100 text-slate-700',
    media: 'bg-brand-yellow/35 text-brand-navy',
    alta: 'bg-brand-teal/20 text-brand-navy',
    critica: 'bg-brand-navy text-white',
  }
  return map[p]
}
</script>

<style scoped>
.explorar-filtros-detalles[open] .explorar-filtros-chevron {
  transform: rotate(180deg);
}
</style>
