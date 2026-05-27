import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { MOCK_REPORTES_PROBLEMATICAS } from '../src/mock/problematicasData'
import { reporteToInsertPayload } from '../src/services/problematicasMappers'

function loadEnv() {
  const envPath = resolve(process.cwd(), '.env')
  try {
    const raw = readFileSync(envPath, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const value = trimmed.slice(eq + 1).trim()
      if (!(key in process.env)) process.env[key] = value
    }
  } catch {
    // .env opcional si las vars ya están exportadas
  }
}

loadEnv()

const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!url || !key) {
  console.error('Define VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY antes de ejecutar el seed.')
  process.exit(1)
}

const supabase = createClient(url, key)

async function main() {
  const { count, error: countError } = await supabase
    .from('reportes')
    .select('id', { count: 'exact', head: true })

  if (countError) throw countError

  if ((count ?? 0) > 0) {
    console.log(`Ya hay ${count} reportes. Omitiendo seed.`)
    return
  }

  for (const reporte of MOCK_REPORTES_PROBLEMATICAS) {
    const { reporte: row, imagenes, comentarios } = reporteToInsertPayload(reporte)

    const { data, error: reporteError } = await supabase
      .from('reportes')
      .insert(row)
      .select('id')
      .single()

    if (reporteError) throw reporteError

    const reporteId = data.id

    if (imagenes.length > 0) {
      const { error } = await supabase
        .from('reporte_imagenes')
        .insert(imagenes.map((img) => ({ ...img, reporte_id: reporteId })))
      if (error) throw error
    }

    if (comentarios.length > 0) {
      const { error } = await supabase
        .from('reporte_comentarios')
        .insert(comentarios.map((c) => ({ ...c, reporte_id: reporteId })))
      if (error) throw error
    }
  }

  console.log(`Seed completado: ${MOCK_REPORTES_PROBLEMATICAS.length} reportes insertados.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
