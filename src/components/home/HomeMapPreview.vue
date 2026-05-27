<template>
  <section
    id="mapa-resumen"
    class="home-fade-up scroll-mt-24"
    style="animation-delay: 0.1s"
    aria-labelledby="home-mapa-titulo"
  >
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h2
          id="home-mapa-titulo"
          class="text-2xl font-bold tracking-tight text-brand-navy"
        >
          Mapa urbano resumido
        </h2>
        <p class="mt-1 max-w-2xl text-slate-600">
          Marcadores mock y zona de atención prioritaria. Explora el mapa completo para ver todos los reportes georreferenciados.
        </p>
      </div>
      <RouterLink
        to="/mapa"
        class="inline-flex shrink-0 items-center justify-center rounded-2xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-brand-navy/90"
      >
        Ver mapa completo
      </RouterLink>
    </div>

    <div
      class="mt-6 overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-[0_20px_60px_-28px_rgba(16,48,88,0.25)]"
    >
      <div
        ref="mapEl"
        class="h-[min(22rem,55vh)] w-full min-h-[280px] sm:h-96"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import L from 'leaflet'
import {
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue'

import { ensureLeafletDefaultIcons } from '@/lib/leafletDefaultIcons'
import type { ReporteProblematica } from '@/types/problematica'

import 'leaflet/dist/leaflet.css'

const props = defineProps<{
  reportes: ReporteProblematica[]
}>()

const mapEl = useTemplateRef<HTMLDivElement>('mapEl')
const mapInstance = ref<L.Map | null>(null)
const layers = ref<L.Layer[]>([])

function clearLayers() {
  const map = mapInstance.value
  if (!map) return
  for (const layer of layers.value) {
    map.removeLayer(layer as L.Layer)
  }
  layers.value = []
}

function buildMap() {
  const el = mapEl.value
  if (!el) return

  ensureLeafletDefaultIcons()

  if (!mapInstance.value) {
    const map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: true,
    }) as L.Map
    mapInstance.value = map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map)
  }

  const map = mapInstance.value as L.Map
  clearLayers()

  const pts = props.reportes.slice(0, 10)
  const markers: L.Marker[] = []

  for (const r of pts) {
    const { lat, lng } = r.coordenadas
    const m = L.marker([lat, lng]).addTo(map) as L.Marker
    const short = r.descripcion.length > 120 ? `${r.descripcion.slice(0, 117)}…` : r.descripcion
    m.bindPopup(
      `<div style="min-width:200px;font-family:system-ui,sans-serif;font-size:13px;line-height:1.35">
        <strong style="color:#103058">${escapeHtml(r.titulo)}</strong><br/>
        <span style="color:#64748b">${escapeHtml(r.localidad)}</span><br/><br/>
        ${escapeHtml(short)}<br/><br/>
        <a href="/BarrioVisible/reportes/${encodeURIComponent(r.id)}" style="color:#1b99a7;font-weight:600">Ver ficha →</a>
      </div>`,
    )
    markers.push(m)
    layers.value.push(m as unknown as L.Layer)
  }

  const centerBogota: L.LatLngTuple = [4.65, -74.08]
  const circle = L.circle(centerBogota, {
    color: '#1b99a7',
    weight: 2,
    fillColor: '#f9c22e',
    fillOpacity: 0.12,
    radius: 3500,
  }).addTo(map) as L.Circle
  circle.bindPopup(
    '<strong style="color:#103058">Zona de análisis prioritaria</strong><br/><span style="color:#64748b">Área mock para concentración de reportes en el centro-sur.</span>',
  )
  layers.value.push(circle as unknown as L.Layer)

  if (markers.length) {
    const fg = L.featureGroup(markers)
    map.fitBounds(fg.getBounds().pad(0.22))
  } else {
    map.setView(centerBogota, 11)
  }

  void nextTick(() => map.invalidateSize())
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

onMounted(async () => {
  await nextTick()
  buildMap()
  requestAnimationFrame(() => mapInstance.value?.invalidateSize())
})

watch(
  () => props.reportes,
  () => buildMap(),
  { deep: true },
)

onUnmounted(() => {
  mapInstance.value?.remove()
  mapInstance.value = null
  layers.value = []
})
</script>
