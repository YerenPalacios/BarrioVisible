import type { ReporteProblematica } from '@/types/problematica'

export type ReporteProblematicaInput = Omit<ReporteProblematica, 'id'>

export function reporteToInsertPayload(reporte: ReporteProblematicaInput) {
  return {
    reporte: {
      titulo: reporte.titulo,
      descripcion: reporte.descripcion,
      categoria: reporte.categoria,
      estado: reporte.estado,
      localidad: reporte.localidad,
      lat: reporte.coordenadas.lat,
      lng: reporte.coordenadas.lng,
      fecha: reporte.fecha,
      prioridad: reporte.prioridad,
      resumen_ia: reporte.resumenIa,
      reportante_id: reporte.usuarioReportante.id,
      reportante_nombre: reporte.usuarioReportante.nombre,
      reportante_alias: reporte.usuarioReportante.alias,
      reportante_email: reporte.usuarioReportante.email,
    },
    imagenes: reporte.imagenes.map((url, orden) => ({ url, orden })),
    comentarios: reporte.comentarios.map((c) => ({
      id: c.id,
      autor: c.autor,
      texto: c.texto,
      fecha: c.fecha,
    })),
  }
}

export function withGeneratedId(reporte: ReporteProblematicaInput): ReporteProblematica {
  return { ...structuredClone(reporte), id: crypto.randomUUID() }
}
