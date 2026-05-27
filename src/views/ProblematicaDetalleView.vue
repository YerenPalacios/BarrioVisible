<template>
  <div class="mx-auto max-w-4xl pb-10">
    <nav
      class="mb-6 text-sm text-slate-500"
      aria-label="Migas de pan"
    >
      <RouterLink
        to="/explorar"
        class="font-medium text-brand-teal hover:text-brand-navy"
      >
        Explorar reportes
      </RouterLink>
      <span
        class="mx-2 text-slate-400"
        aria-hidden="true"
      >
        /
      </span>
      <span class="text-slate-700">Detalle</span>
    </nav>

    <template v-if="reporte">
      <header class="border-b border-brand-navy/10 pb-6">
        <div class="flex flex-wrap items-start gap-3">
          <span
            class="inline-flex rounded-full border border-brand-navy/10 bg-brand-surface px-3 py-1 text-xs font-medium text-brand-navy"
          >
            {{ CATEGORIA_LABELS[reporte.categoria] || reporte.categoria }}
          </span>
          <span
            class="inline-flex rounded-full px-3 py-1 text-xs font-medium"
            :class="estadoBadgeClass(reporte.estado)"
          >
            {{ ESTADO_LABELS[reporte.estado] }}
          </span>
          <span
            class="inline-flex rounded-full px-3 py-1 text-xs font-medium"
            :class="prioridadBadgeClass(reporte.prioridad)"
          >
            Prioridad: {{ PRIORIDAD_LABELS[reporte.prioridad] }}
          </span>
        </div>
        <h1 class="mt-4 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
          {{ reporte.titulo }}
        </h1>
        <dl class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
          <div>
            <dt class="font-medium text-slate-500">
              Localidad
            </dt>
            <dd>{{ reporte.localidad }}</dd>
          </div>
          <div>
            <dt class="font-medium text-slate-500">
              Reportado
            </dt>
            <dd>{{ fechaFormateada }}</dd>
          </div>
          <div>
            <dt class="font-medium text-slate-500">
              ID
            </dt>
            <dd class="font-mono text-xs text-slate-700">
              {{ reporte.id }}
            </dd>
          </div>
        </dl>
      </header>

      <section class="mt-8">
        <h2 class="text-lg font-semibold text-brand-navy">
          Ubicación
        </h2>
        <p class="mt-2 font-mono text-sm text-slate-600">
          {{ reporte.coordenadas.lat.toFixed(5) }},
          {{ reporte.coordenadas.lng.toFixed(5) }}
        </p>
        <MapaUbicacion
          :key="reporte.id"
          class="mt-4"
          :lat="reporte.coordenadas.lat"
          :lng="reporte.coordenadas.lng"
        />
        <a
          class="mt-3 inline-flex text-sm font-medium text-brand-teal hover:text-brand-navy"
          :href="mapaUrl"
          rel="noopener noreferrer"
          target="_blank"
        >
          Abrir en mapa (OpenStreetMap)
        </a>
      </section>

      <section class="mt-8">
        <h2 class="text-lg font-semibold text-brand-navy">
          Descripción
        </h2>
        <p class="mt-3 whitespace-pre-wrap text-slate-700 leading-relaxed">
          {{ reporte.descripcion }}
        </p>
      </section>

      <section class="mt-8 rounded-xl border border-brand-teal/25 bg-brand-teal/10 p-5">
        <h2 class="text-lg font-semibold text-brand-navy">
          Resumen (IA mock)
        </h2>
        <p class="mt-2 text-sm text-brand-navy/90 leading-relaxed">
          {{ reporte.resumenIa }}
        </p>
      </section>

      <section
        v-if="reporte.imagenes.length"
        class="mt-8"
      >
        <h2 class="text-lg font-semibold text-brand-navy">
          Imágenes
        </h2>
        <ul class="mt-4 grid gap-4 sm:grid-cols-2">
          <li
            v-for="(src, index) in reporte.imagenes"
            :key="`${reporte.id}-img-${index}`"
          >
            <img
              :src="src"
              :alt="`Evidencia ${index + 1} del reporte ${reporte.id}`"
              class="h-48 w-full rounded-lg border border-slate-200 object-cover shadow-sm"
              loading="lazy"
            >
          </li>
        </ul>
      </section>

      <section class="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="text-lg font-semibold text-brand-navy">
          Persona que reporta
        </h2>
        <div class="mt-4 flex items-start gap-4">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 text-sm font-semibold text-brand-navy"
            aria-hidden="true"
          >
            {{ iniciales(reporte.usuarioReportante.nombre) }}
          </div>
          <div>
            <p class="font-medium text-slate-900">
              {{ reporte.usuarioReportante.nombre }}
            </p>
            <p class="text-sm text-slate-500">
              @{{ reporte.usuarioReportante.alias }}
            </p>
            <p class="mt-1 text-sm text-slate-600">
              {{ reporte.usuarioReportante.email }}
            </p>
          </div>
        </div>
      </section>

      <section class="mt-8">
        <h2 class="text-lg font-semibold text-brand-navy">
          Comentarios ({{ reporte.comentarios.length }})
        </h2>
        <ul
          v-if="reporte.comentarios.length"
          class="mt-4 space-y-4"
        >
          <li
            v-for="c in reporte.comentarios"
            :key="c.id"
            class="border-l-4 border-brand-green pl-4"
          >
            <p class="text-sm font-medium text-slate-900">
              {{ c.autor }}
            </p>
            <p class="mt-1 text-sm text-slate-600 leading-relaxed">
              {{ c.texto }}
            </p>
            <p class="mt-2 text-xs text-slate-400">
              {{ formatComentarioFecha(c.fecha) }}
            </p>
          </li>
        </ul>
        <p
          v-else
          class="mt-3 text-sm text-slate-500"
        >
          Aún no hay comentarios en este reporte mock.
        </p>
      </section>
    </template>

    <div
      v-else
      class="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm"
    >
      <h1 class="text-xl font-semibold text-brand-navy">
        Reporte no encontrado
      </h1>
      <p class="mt-2 text-slate-600">
        No existe una problemática con el identificador indicado.
      </p>
      <RouterLink
        to="/explorar"
        class="mt-6 inline-block text-sm font-medium text-brand-teal hover:text-brand-navy"
      >
        Volver a explorar
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import {
  CATEGORIA_LABELS,
  ESTADO_LABELS,
  PRIORIDAD_LABELS,
} from '@/constants/problematicaLabels'
import MapaUbicacion from '@/components/MapaUbicacion.vue'
import { useProblematicasStore } from '@/stores/problematicas'
import type { EstadoReporte, PrioridadReporte } from '@/types/problematica'

const route = useRoute()
const store = useProblematicasStore()

const id = computed(() => {
  const raw = route.params.id
  return typeof raw === 'string' ? raw : Array.isArray(raw) ? (raw[0] ?? '') : ''
})

const reporte = computed(() => (id.value ? store.reportePorId(id.value) : null))

const fechaFormateada = computed(() => {
  if (!reporte.value) return ''
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(reporte.value.fecha))
})

const mapaUrl = computed(() => {
  if (!reporte.value) return '#'
  const { lat, lng } = reporte.value.coordenadas
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`
})

function prioridadBadgeClass(p: PrioridadReporte): string {
  const map: Record<PrioridadReporte, string> = {
    baja: 'bg-slate-100 text-slate-700',
    media: 'bg-brand-yellow/35 text-brand-navy',
    alta: 'bg-brand-teal/20 text-brand-navy',
    critica: 'bg-brand-navy text-white',
  }
  return map[p]
}

function estadoBadgeClass(e: EstadoReporte): string {
  const map: Record<EstadoReporte, string> = {
    abierto: 'bg-brand-teal/15 text-brand-navy',
    en_revision: 'bg-brand-navy/12 text-brand-navy',
    en_curso: 'bg-brand-yellow/40 text-brand-navy',
    resuelto: 'bg-brand-green/25 text-brand-navy',
    cerrado: 'bg-slate-200 text-slate-700',
  }
  return map[e]
}

function iniciales(nombre: string): string {
  const parts = nombre.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function formatComentarioFecha(iso: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}
</script>
