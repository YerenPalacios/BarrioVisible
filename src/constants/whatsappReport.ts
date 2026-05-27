/** Mensaje inicial al abrir WhatsApp desde la app (URL-encoded por URLSearchParams). */
export const WHATSAPP_REPORT_DEFAULT_TEXT =
  'Hola, quiero reportar una problemática en mi barrio (BarrioVisible).'

function normalizeE164(raw: string | undefined): string | null {
  if (raw == null || !String(raw).trim()) return null
  const digits = String(raw).replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15) return null
  return digits
}

/**
 * Línea para reportes por WhatsApp (solo dígitos, sin +).
 * Configura `VITE_WHATSAPP_REPORT_E164` en `.env`; si no existe, se usa un número demo solo para maquetas locales.
 */
export const WHATSAPP_REPORT_E164 =
  normalizeE164(import.meta.env.VITE_WHATSAPP_REPORT_E164) ?? '+15556605322'

export function buildWhatsappReportUrl(text = WHATSAPP_REPORT_DEFAULT_TEXT): string {
  const params = new URLSearchParams({ text })
  return `https://wa.me/${WHATSAPP_REPORT_E164}?${params.toString()}`
}
