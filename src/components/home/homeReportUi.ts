import type { EstadoReporte, PrioridadReporte } from '@/types/problematica'

export function estadoVisual(estado: EstadoReporte): { label: string; class: string } {
  switch (estado) {
    case 'resuelto':
      return {
        label: 'Resuelto',
        class:
          'bg-brand-green/15 text-brand-navy ring-1 ring-brand-green/35',
      }
    case 'en_revision':
    case 'en_curso':
      return {
        label: 'En proceso',
        class:
          'bg-brand-yellow/35 text-brand-navy ring-1 ring-brand-yellow/55',
      }
    case 'abierto':
      return {
        label: 'Pendiente',
        class: 'bg-brand-teal/12 text-brand-navy ring-1 ring-brand-teal/30',
      }
    case 'cerrado':
    default:
      return {
        label: 'Archivado',
        class: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200/90',
      }
  }
}

export function prioridadChipClass(p: PrioridadReporte): string {
  const map: Record<PrioridadReporte, string> = {
    baja: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
    media: 'bg-brand-yellow/30 text-brand-navy ring-1 ring-brand-yellow/50',
    alta: 'bg-brand-teal/18 text-brand-navy ring-1 ring-brand-teal/35',
    critica: 'bg-brand-navy text-white ring-1 ring-brand-navy/40',
  }
  return map[p]
}

export function formatFechaCorta(iso: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}
