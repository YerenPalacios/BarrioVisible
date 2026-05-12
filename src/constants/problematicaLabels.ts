import type { CategoriaProblematica, EstadoReporte, PrioridadReporte } from '@/types/problematica'

export const CATEGORIA_LABELS: Record<CategoriaProblematica, string> = {
  hueco_peligroso: 'Hueco peligroso',
  inseguridad_estacion: 'Inseguridad cerca de estación',
  semaforo_danado: 'Semáforo dañado',
  ruido_nocturno: 'Ruido nocturno',
  basura_acumulada: 'Basura acumulada',
  alumbrado_publico: 'Alumbrado público dañado',
  accesibilidad: 'Accesibilidad deficiente',
  alcantarillado: 'Alcantarillado colapsado / rebalse',
  anden_obstruido: 'Andén obstruido (vendedores u otros)',
}

export const ESTADO_LABELS: Record<EstadoReporte, string> = {
  abierto: 'Abierto',
  en_revision: 'En revisión',
  en_curso: 'En curso',
  resuelto: 'Resuelto',
  cerrado: 'Cerrado',
}

export const PRIORIDAD_LABELS: Record<PrioridadReporte, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Alta',
  critica: 'Crítica',
}
