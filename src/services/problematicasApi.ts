import { supabase } from '@/lib/supabase'
import {
  reporteToInsertPayload,
  type ReporteProblematicaInput,
} from '@/services/problematicasMappers'
import type {
  CategoriaProblematica,
  EstadoReporte,
  PrioridadReporte,
  ReporteProblematica,
} from '@/types/problematica'

const REPORTE_SELECT = `
  id,
  titulo,
  descripcion,
  categoria,
  estado,
  localidad,
  lat,
  lng,
  fecha,
  prioridad,
  resumen_ia,
  reportante_id,
  reportante_nombre,
  reportante_alias,
  reportante_email,
  reporte_imagenes ( url, orden ),
  reporte_comentarios ( id, autor, texto, fecha )
`

type ImagenRow = { url: string; orden: number }
type ComentarioRow = { id: string; autor: string; texto: string; fecha: string }

type ReporteRow = {
  id: string
  titulo: string
  descripcion: string
  categoria: CategoriaProblematica
  estado: EstadoReporte
  localidad: string
  lat: number
  lng: number
  fecha: string
  prioridad: PrioridadReporte
  resumen_ia: string
  reportante_id: string
  reportante_nombre: string
  reportante_alias: string
  reportante_email: string
  reporte_imagenes: ImagenRow[] | null
  reporte_comentarios: ComentarioRow[] | null
}

function assertClient() {
  if (!supabase) {
    throw new Error(
      'Supabase no está configurado. Define VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY.',
    )
  }
  return supabase
}

function rowToReporte(row: ReporteRow): ReporteProblematica {
  const imagenes = [...(row.reporte_imagenes ?? [])]
    .sort((a, b) => a.orden - b.orden)
    .map((img) => img.url)

  const comentarios = [...(row.reporte_comentarios ?? [])]
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .map((c) => ({
      id: c.id,
      autor: c.autor,
      texto: c.texto,
      fecha: c.fecha,
    }))

  return {
    id: row.id,
    titulo: row.titulo,
    descripcion: row.descripcion,
    categoria: row.categoria,
    estado: row.estado,
    localidad: row.localidad,
    coordenadas: { lat: row.lat, lng: row.lng },
    fecha: row.fecha,
    prioridad: row.prioridad,
    resumenIa: row.resumen_ia,
    imagenes,
    usuarioReportante: {
      id: row.reportante_id,
      nombre: row.reportante_nombre,
      alias: row.reportante_alias,
      email: row.reportante_email,
    },
    comentarios,
  }
}

export async function fetchReportes(): Promise<ReporteProblematica[]> {
  const client = assertClient()
  const { data, error } = await client
    .from('reportes')
    .select(REPORTE_SELECT)
    .order('fecha', { ascending: false })

  if (error) throw error
  return (data as ReporteRow[]).map(rowToReporte)
}

export async function updateReporte(
  id: string,
  patch: Partial<Pick<ReporteProblematica, 'titulo' | 'estado' | 'prioridad'>>,
): Promise<boolean> {
  const client = assertClient()
  const payload: Record<string, string> = {}
  if (patch.titulo !== undefined) payload.titulo = patch.titulo
  if (patch.estado !== undefined) payload.estado = patch.estado
  if (patch.prioridad !== undefined) payload.prioridad = patch.prioridad

  if (Object.keys(payload).length === 0) return true

  const { data, error } = await client
    .from('reportes')
    .update(payload)
    .eq('id', id)
    .select('id')
    .maybeSingle()

  if (error) throw error
  return data != null
}

export async function deleteReporte(id: string): Promise<boolean> {
  const client = assertClient()
  const { data, error } = await client
    .from('reportes')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle()

  if (error) throw error
  return data != null
}

export async function insertReporte(reporte: ReporteProblematicaInput): Promise<string> {
  const client = assertClient()
  const { reporte: row, imagenes, comentarios } = reporteToInsertPayload(reporte)

  const { data, error: reporteError } = await client
    .from('reportes')
    .insert(row)
    .select('id')
    .single()

  if (reporteError) throw reporteError

  const reporteId = data.id

  if (imagenes.length > 0) {
    const { error } = await client
      .from('reporte_imagenes')
      .insert(imagenes.map((img) => ({ ...img, reporte_id: reporteId })))
    if (error) throw error
  }

  if (comentarios.length > 0) {
    const { error } = await client
      .from('reporte_comentarios')
      .insert(comentarios.map((c) => ({ ...c, reporte_id: reporteId })))
    if (error) throw error
  }

  return reporteId
}

export async function replaceAllReportes(reportes: ReporteProblematicaInput[]): Promise<void> {
  const client = assertClient()
  const { error: deleteError } = await client.from('reportes').delete().not('id', 'is', null)
  if (deleteError) throw deleteError

  for (const reporte of reportes) {
    await insertReporte(reporte)
  }
}
