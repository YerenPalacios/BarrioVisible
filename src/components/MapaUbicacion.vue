<template>
  <div
    class="mapa-ubicacion overflow-hidden rounded-lg border border-brand-navy/15 shadow-sm"
    role="region"
    :aria-label="ariaLabel"
  >
    <div
      ref="mapEl"
      class="h-64 w-full min-h-[16rem] md:h-80"
    />
  </div>
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

import 'leaflet/dist/leaflet.css'

const props = withDefaults(
  defineProps<{
    lat: number
    lng: number
    /** Zoom inicial (12–18 recomendado en ciudad). */
    zoom?: number
    ariaLabel?: string
  }>(),
  {
    zoom: 16,
    ariaLabel: 'Mapa con la ubicación aproximada del reporte',
  },
)

const mapEl = useTemplateRef<HTMLDivElement>('mapEl')
const mapInstance = ref<L.Map | null>(null)
const markerLayer = ref<L.Marker | null>(null)

function center(): L.LatLngTuple {
  return [props.lat, props.lng]
}

function initMap() {
  const el = mapEl.value
  if (!el || mapInstance.value) return

  ensureLeafletDefaultIcons()

  const map = L.map(el, {
    scrollWheelZoom: false,
    attributionControl: true,
  }).setView(center(), props.zoom)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map)

  const marker = L.marker(center()).addTo(map)
  marker.bindPopup(
    `<div class="text-sm"><strong>Ubicación reportada</strong><br>${props.lat.toFixed(5)}, ${props.lng.toFixed(5)}</div>`,
  )

  mapInstance.value = map
  markerLayer.value = marker

  void nextTick(() => {
    map.invalidateSize()
  })
}

function updatePosition() {
  const map = mapInstance.value
  const marker = markerLayer.value
  if (!map || !marker) return
  const c = center()
  map.setView(c, props.zoom)
  marker.setLatLng(c)
  marker.setPopupContent(
    `<div class="text-sm"><strong>Ubicación reportada</strong><br>${props.lat.toFixed(5)}, ${props.lng.toFixed(5)}</div>`,
  )
}

function destroyMap() {
  mapInstance.value?.remove()
  mapInstance.value = null
  markerLayer.value = null
}

onMounted(async () => {
  await nextTick()
  initMap()
  requestAnimationFrame(() => {
    mapInstance.value?.invalidateSize()
  })
})

onUnmounted(() => {
  destroyMap()
})

watch(
  () => [props.lat, props.lng, props.zoom] as const,
  () => {
    updatePosition()
  },
)
</script>

<style scoped>
.mapa-ubicacion :deep(.leaflet-container) {
  font-family: inherit;
  z-index: 0;
}
</style>
