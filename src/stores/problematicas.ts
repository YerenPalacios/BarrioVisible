import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { MOCK_REPORTES_PROBLEMATICAS } from '@/mock/problematicasData'
import { isSupabaseConfigured } from '@/lib/supabase'
import { withGeneratedId } from '@/services/problematicasMappers'
import {
  deleteReporte as deleteReporteApi,
  fetchReportes as fetchReportesApi,
  replaceAllReportes,
  updateReporte as updateReporteApi,
} from '@/services/problematicasApi'
import type {
  CategoriaProblematica,
  EstadoReporte,
  PrioridadReporte,
  ReporteProblematica,
} from '@/types/problematica'

function cloneReportes(): ReporteProblematica[] {
  return MOCK_REPORTES_PROBLEMATICAS.map((r) => withGeneratedId(r))
}

export const useProblematicasStore = defineStore('problematicas', () => {
  const reportes = ref<ReporteProblematica[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const initialized = ref(false)

  const total = computed(() => reportes.value.length)

  const categoriasPresentes = computed(() => {
    const set = new Set<CategoriaProblematica>()
    for (const r of reportes.value) set.add(r.categoria)
    return [...set]
  })

  const localidadesPresentes = computed(() => {
    const set = new Set<string>()
    for (const r of reportes.value) set.add(r.localidad)
    return [...set].sort((a, b) => a.localeCompare(b, 'es'))
  })

  function reportePorId(id: string): ReporteProblematica | null {
    return reportes.value.find((r) => r.id === id) ?? null
  }

  async function cargarReportes(): Promise<void> {
    if (initialized.value && !error.value) return

    loading.value = true
    error.value = null

    try {
      if (isSupabaseConfigured) {
        reportes.value = await fetchReportesApi()
      } else {
        reportes.value = cloneReportes()
      }
      initialized.value = true
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'No se pudieron cargar los reportes.'
      if (reportes.value.length === 0) {
        reportes.value = cloneReportes()
      }
    } finally {
      loading.value = false
    }
  }

  async function actualizarReporte(
    id: string,
    patch: Partial<Pick<ReporteProblematica, 'titulo' | 'estado' | 'prioridad'>>,
  ): Promise<boolean> {
    const idx = reportes.value.findIndex((r) => r.id === id)
    if (idx === -1) return false

    const prev = reportes.value[idx]
    reportes.value[idx] = { ...prev, ...patch }

    if (isSupabaseConfigured) {
      try {
        const ok = await updateReporteApi(id, patch)
        if (!ok) {
          reportes.value[idx] = prev
          return false
        }
      } catch {
        reportes.value[idx] = prev
        return false
      }
    }

    return true
  }

  async function eliminarReporte(id: string): Promise<boolean> {
    const prev = reportes.value
    reportes.value = reportes.value.filter((r) => r.id !== id)
    const removed = reportes.value.length !== prev.length
    if (!removed) return false

    if (isSupabaseConfigured) {
      try {
        const ok = await deleteReporteApi(id)
        if (!ok) {
          reportes.value = prev
          return false
        }
      } catch {
        reportes.value = prev
        return false
      }
    }

    return true
  }

  function reportesPorCategoria(categoria: CategoriaProblematica): ReporteProblematica[] {
    return reportes.value.filter((r) => r.categoria === categoria)
  }

  function reportesPorLocalidad(localidad: string): ReporteProblematica[] {
    return reportes.value.filter(
      (r) => r.localidad.toLowerCase() === localidad.trim().toLowerCase(),
    )
  }

  function reportesPorEstado(estado: EstadoReporte): ReporteProblematica[] {
    return reportes.value.filter((r) => r.estado === estado)
  }

  function reportesPorPrioridad(prioridad: PrioridadReporte): ReporteProblematica[] {
    return reportes.value.filter((r) => r.prioridad === prioridad)
  }

  function buscarTexto(query: string): ReporteProblematica[] {
    const q = query.trim().toLowerCase()
    if (!q) return [...reportes.value]
    return reportes.value.filter((r) => {
      return (
        r.titulo.toLowerCase().includes(q) ||
        r.descripcion.toLowerCase().includes(q) ||
        r.localidad.toLowerCase().includes(q) ||
        r.resumenIa.toLowerCase().includes(q) ||
        r.usuarioReportante.nombre.toLowerCase().includes(q) ||
        r.usuarioReportante.alias.toLowerCase().includes(q)
      )
    })
  }

  /** Orden por fecha (más reciente primero). */
  function ordenadosPorFecha(descendente = true): ReporteProblematica[] {
    const copy = [...reportes.value]
    copy.sort((a, b) => {
      const ta = new Date(a.fecha).getTime()
      const tb = new Date(b.fecha).getTime()
      return descendente ? tb - ta : ta - tb
    })
    return copy
  }

  const conteoPorEstado = computed(() => {
    const map: Record<EstadoReporte, number> = {
      abierto: 0,
      en_revision: 0,
      en_curso: 0,
      resuelto: 0,
      cerrado: 0,
    }
    for (const r of reportes.value) map[r.estado] += 1
    return map
  })

  const conteoPorPrioridad = computed(() => {
    const map: Record<PrioridadReporte, number> = {
      baja: 0,
      media: 0,
      alta: 0,
      critica: 0,
    }
    for (const r of reportes.value) map[r.prioridad] += 1
    return map
  })

  const resumenPorCategoria = computed(() => {
    const m = new Map<CategoriaProblematica, number>()
    for (const r of reportes.value) {
      m.set(r.categoria, (m.get(r.categoria) ?? 0) + 1)
    }
    return [...m.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([categoria, count]) => ({ categoria, count }))
  })

  const resumenPorLocalidad = computed(() => {
    const m = new Map<string, number>()
    for (const r of reportes.value) {
      m.set(r.localidad, (m.get(r.localidad) ?? 0) + 1)
    }
    return [...m.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([localidad, count]) => ({ localidad, count }))
  })

  const reportesActivos = computed(
    () =>
      reportes.value.filter(
        (r) =>
          r.estado === 'abierto' ||
          r.estado === 'en_revision' ||
          r.estado === 'en_curso',
      ).length,
  )

  const reportesUrgentes = computed(
    () =>
      reportes.value.filter(
        (r) =>
          (r.prioridad === 'critica' || r.prioridad === 'alta') &&
          r.estado !== 'resuelto' &&
          r.estado !== 'cerrado',
      ).length,
  )

  /** Restaura el dataset mock en Supabase (o en memoria si no hay backend). */
  async function reiniciarMock(): Promise<void> {
    if (isSupabaseConfigured) {
      await replaceAllReportes(MOCK_REPORTES_PROBLEMATICAS)
      reportes.value = await fetchReportesApi()
      return
    }
    reportes.value = cloneReportes()
  }

  return {
    reportes,
    loading,
    error,
    initialized,
    total,
    categoriasPresentes,
    localidadesPresentes,
    conteoPorEstado,
    conteoPorPrioridad,
    resumenPorCategoria,
    resumenPorLocalidad,
    reportesActivos,
    reportesUrgentes,
    cargarReportes,
    reportePorId,
    reportesPorCategoria,
    reportesPorLocalidad,
    reportesPorEstado,
    reportesPorPrioridad,
    buscarTexto,
    ordenadosPorFecha,
    actualizarReporte,
    eliminarReporte,
    reiniciarMock,
  }
})
