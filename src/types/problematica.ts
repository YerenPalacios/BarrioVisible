export type CategoriaProblematica = string

export type EstadoReporte =
  | 'abierto'
  | 'en_revision'
  | 'en_curso'
  | 'resuelto'
  | 'cerrado'

export type PrioridadReporte = 'baja' | 'media' | 'alta' | 'critica'

export interface Coordenadas {
  lat: number
  lng: number
}

export interface UsuarioReportante {
  id: string
  nombre: string
  alias: string
  email: string
}

export interface ComentarioReporte {
  id: string
  autor: string
  texto: string
  fecha: string
}

export interface ReporteProblematica {
  id: string
  titulo: string
  descripcion: string
  categoria: CategoriaProblematica
  estado: EstadoReporte
  localidad: string
  coordenadas: Coordenadas
  fecha: string
  prioridad: PrioridadReporte
  resumenIa: string
  imagenes: string[]
  usuarioReportante: UsuarioReportante
  comentarios: ComentarioReporte[]
}
