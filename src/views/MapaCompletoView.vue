<template>
  <div class="flex min-h-[min(100vh,920px)] flex-col">
    <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
          Mapa de reportes
        </h1>
        <p class="mt-1 max-w-2xl text-sm text-slate-600 md:text-base">
          Vista geográfica de las problemáticas mock. Pulsa un marcador para abrir la ficha.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <RouterLink
          to="/explorar"
          class="rounded-xl border border-brand-navy/15 bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm transition hover:border-brand-teal/40"
        >
          Ver listado
        </RouterLink>
        <RouterLink
          to="/"
          class="rounded-xl bg-brand-surface px-4 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-teal/15"
        >
          Inicio
        </RouterLink>
      </div>
    </div>

    <div
      ref="mapEl"
      class="min-h-[min(70vh,560px)] flex-1 overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-lg"
    />
  </div>
</template>

<script setup lang="ts">
import L from 'leaflet'
import { storeToRefs } from 'pinia'
import {
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue'

import { ensureLeafletDefaultIcons } from '@/lib/leafletDefaultIcons'
import { useProblematicasStore } from '@/stores/problematicas'

import 'leaflet/dist/leaflet.css'

const store = useProblematicasStore()
const { reportes } = storeToRefs(store)
const mapEl = useTemplateRef<HTMLDivElement>('mapEl')
const mapInstance = ref<L.Map | null>(null)
const layerGroup = ref<L.LayerGroup | null>(null)

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function rebuild() {
  const el = mapEl.value
  if (!el) return

  ensureLeafletDefaultIcons()

  if (!mapInstance.value) {
    const map = L.map(el, { scrollWheelZoom: true }) as L.Map
    mapInstance.value = map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map)
    layerGroup.value = L.layerGroup().addTo(map) as L.LayerGroup
  }

  const map = mapInstance.value as L.Map
  const group = layerGroup.value as L.LayerGroup
  if (!map || !group) return

  group.clearLayers()

  const markers: L.Marker[] = []
  for (const r of reportes.value) {
    const { lat, lng } = r.coordenadas
    const m = L.marker([lat, lng])
    const short =
      r.descripcion.length > 100 ? `${r.descripcion.slice(0, 97)}…` : r.descripcion
    m.bindPopup(
      `<div style="min-width:220px;font-family:system-ui,sans-serif;font-size:13px">
        <strong style="color:#103058">${escapeHtml(r.titulo)}</strong><br/>
        <span style="color:#64748b">${escapeHtml(r.localidad)}</span><br/><br/>
        ${escapeHtml(short)}<br/><br/>
        <a href="/reportes/${encodeURIComponent(r.id)}" style="color:#1b99a7;font-weight:600">Abrir ficha →</a>
      </div>`,
    )
    group.addLayer(m)
    markers.push(m)
  }

  if (markers.length) {
    map.fitBounds(L.featureGroup(markers).getBounds().pad(0.12))
  } else {
    map.setView([4.65, -74.08], 11)
  }

  void nextTick(() => map.invalidateSize())
}

onMounted(async () => {
  await nextTick()
  rebuild()
  requestAnimationFrame(() => mapInstance.value?.invalidateSize())
})

watch(reportes, () => rebuild(), { deep: true })

onUnmounted(() => {
  mapInstance.value?.remove()
  mapInstance.value = null
  layerGroup.value = null
})
</script>
