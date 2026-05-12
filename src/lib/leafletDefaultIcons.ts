import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

let iconsReady = false

/** Corrige rutas de iconos por defecto con bundlers (Vite). */
export function ensureLeafletDefaultIcons(): void {
  if (iconsReady) return
  iconsReady = true
  const icon = L.icon({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
  const markerProto = L.Marker.prototype as unknown as { options: { icon: L.Icon } }
  markerProto.options.icon = icon
}
