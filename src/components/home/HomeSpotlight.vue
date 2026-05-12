<template>
  <section
    class="home-fade-up"
    style="animation-delay: 0.2s"
    aria-labelledby="home-spot-titulo"
  >
    <h2
      id="home-spot-titulo"
      class="text-2xl font-bold tracking-tight text-brand-navy"
    >
      Casos destacados
    </h2>
    <p class="mt-1 max-w-2xl text-slate-600">
      Prioridad alta o crítica — visibilidad máxima para decisiones urbanas.
    </p>

    <template v-if="reportes.length">
      <div class="mt-8 grid gap-5 lg:grid-cols-3">
        <RouterLink
          v-for="r in reportes"
          :key="r.id"
          :to="{ name: 'problematica-detalle', params: { id: r.id } }"
          class="group relative overflow-hidden rounded-2xl border border-brand-navy/10 bg-gradient-to-br from-brand-navy/[0.04] via-white to-brand-teal/[0.06] p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:border-brand-teal/35 hover:shadow-xl"
        >
          <div
            class="absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
            :class="r.prioridad === 'critica' ? 'bg-brand-navy' : 'bg-brand-yellow text-brand-navy'"
          >
            {{ r.prioridad === 'critica' ? 'Crítico' : 'Alta prioridad' }}
          </div>
          <p class="pr-16 text-xs font-medium uppercase tracking-wide text-brand-teal">
            {{ r.localidad }}
          </p>
          <h3 class="mt-2 text-lg font-semibold leading-snug text-brand-navy group-hover:text-brand-teal">
            {{ r.titulo }}
          </h3>
          <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {{ r.descripcion }}
          </p>
          <span class="mt-5 inline-flex items-center text-xs font-semibold text-brand-teal">
            Ver caso →
          </span>
        </RouterLink>
      </div>
    </template>
    <p
      v-else
      class="mt-6 rounded-2xl border border-dashed border-brand-navy/15 bg-brand-surface/50 px-4 py-6 text-center text-sm text-slate-600"
    >
      No hay casos de alta o crítica en el mock actual. Explora el listado para ver más reportes.
    </p>
  </section>
</template>

<script setup lang="ts">
import type { ReporteProblematica } from '@/types/problematica'

defineProps<{
  reportes: ReporteProblematica[]
}>()
</script>
