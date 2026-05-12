<template>
  <section
    class="home-fade-up"
    style="animation-delay: 0.14s"
    aria-labelledby="home-cat-titulo"
  >
    <h2
      id="home-cat-titulo"
      class="text-2xl font-bold tracking-tight text-brand-navy"
    >
      Categorías principales
    </h2>
    <p class="mt-1 max-w-2xl text-slate-600">
      Ejes temáticos para organizar reportes y análisis — inspirados en la operación real de una ciudad.
    </p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <RouterLink
        v-for="cat in HOME_CATEGORIAS"
        :key="cat.id"
        :to="{ name: 'explorar', query: { tema: cat.id } }"
        class="group relative overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br p-5 shadow-sm ring-1 ring-slate-100/90 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        :class="cat.surface"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-brand-navy shadow-sm ring-1 ring-slate-100/80 transition group-hover:scale-105"
        >
          <CategoryGlyph :name="cat.id" />
        </div>
        <h3 class="mt-4 text-base font-semibold text-brand-navy">
          {{ cat.titulo }}
        </h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          {{ cat.descripcion }}
        </p>
        <span
          class="mt-4 inline-flex items-center text-xs font-semibold text-brand-teal transition group-hover:translate-x-0.5"
        >
          Explorar reportes →
        </span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import CategoryGlyph from './HomeCategoryGlyph.vue'
import { HOME_CATEGORIAS } from './homeCategories'
</script>
