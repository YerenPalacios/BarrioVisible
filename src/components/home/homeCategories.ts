import type { CategoriaProblematica } from '@/types/problematica'

/** Identificador del eje temático en la home (query `tema` en Explorar). */
export type HomeTemaId =
  | 'seguridad'
  | 'vial'
  | 'basuras'
  | 'espacio'
  | 'movilidad'
  | 'ruido'
  | 'alumbrado'
  | 'medio-ambiente'

/** Categorías de presentación (agrupación visual; enlazan a explorar). */
export interface HomeCategoryItem {
  id: HomeTemaId
  titulo: string
  descripcion: string
  /** Clases Tailwind para fondo suave + anillo */
  surface: string
}

/** Mapeo de eje de la home → tipos de reporte en datos. */
export const HOME_TEMA_TO_CATEGORIAS: Record<HomeTemaId, CategoriaProblematica[]> = {
  seguridad: ['inseguridad_estacion'],
  vial: ['hueco_peligroso', 'semaforo_danado'],
  basuras: ['basura_acumulada'],
  espacio: ['anden_obstruido'],
  movilidad: ['accesibilidad'],
  ruido: ['ruido_nocturno'],
  alumbrado: ['alumbrado_publico'],
  'medio-ambiente': ['alcantarillado'],
}

export function isHomeTemaId(value: string): value is HomeTemaId {
  return Object.prototype.hasOwnProperty.call(HOME_TEMA_TO_CATEGORIAS, value)
}

export function homeCategoryTitulo(tema: HomeTemaId): string {
  return HOME_CATEGORIAS.find((c) => c.id === tema)?.titulo ?? tema
}

export const HOME_CATEGORIAS: HomeCategoryItem[] = [
  {
    id: 'seguridad',
    titulo: 'Seguridad',
    descripcion: 'Entornos de TM, calles y espacios con percepción de riesgo.',
    surface: 'from-rose-50 to-white ring-rose-100/80',
  },
  {
    id: 'vial',
    titulo: 'Infraestructura vial',
    descripcion: 'Huecos, señalización y cruces inseguros.',
    surface: 'from-amber-50/90 to-white ring-amber-100/90',
  },
  {
    id: 'basuras',
    titulo: 'Basuras',
    descripcion: 'Acumulación, vertimientos y aseo en la vía pública.',
    surface: 'from-lime-50/80 to-white ring-lime-100/80',
  },
  {
    id: 'espacio',
    titulo: 'Espacio público',
    descripcion: 'Andenes, plazas, parques y obstrucciones al peatón.',
    surface: 'from-sky-50/80 to-white ring-sky-100/80',
  },
  {
    id: 'movilidad',
    titulo: 'Movilidad',
    descripcion: 'Accesibilidad, intermodal y flujo peatonal.',
    surface: 'from-violet-50/70 to-white ring-violet-100/80',
  },
  {
    id: 'ruido',
    titulo: 'Ruido',
    descripcion: 'Ruido nocturno y convivencia en densidad mixta.',
    surface: 'from-fuchsia-50/60 to-white ring-fuchsia-100/70',
  },
  {
    id: 'alumbrado',
    titulo: 'Alumbrado público',
    descripcion: 'Luminarias, zonas oscuras y seguridad nocturna.',
    surface: 'from-yellow-50/90 to-white ring-yellow-100/90',
  },
  {
    id: 'medio-ambiente',
    titulo: 'Medio ambiente',
    descripcion: 'Alcantarillado, olores y afectación ambiental local.',
    surface: 'from-emerald-50/80 to-white ring-emerald-100/80',
  },
]
