import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ijlbsduscnwpyqzzejre.supabase.co'
const supabaseKey = 'sb_publishable_gixXlt8fO3EA_Mi-zsgUIQ_yzQp7uDH'

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!)
  : null
