<template>
  <div class="w-full">
    <div
      v-if="showForbidden"
      class="home-fade-up mb-8 rounded-2xl border border-brand-yellow/60 bg-brand-yellow/25 px-4 py-3 text-sm text-brand-navy"
      role="status"
    >
      No tienes permiso para acceder a esa sección.
      <button
        type="button"
        class="ml-2 font-medium text-brand-navy underline decoration-brand-teal/60 hover:decoration-brand-teal"
        @click="clearForbidden"
      >
        Cerrar
      </button>
    </div>

    <div class="mx-auto flex max-w-7xl flex-col gap-16 pb-6 sm:gap-20 lg:gap-24">
      <HomeHero
        :is-authenticated="isAuthenticated"
        :effective-role="effectiveRole"
        :session-label="user?.displayName ?? null"
      />

      <HomeMetrics
        :total="problematicas.total"
        :resueltos="resueltosCount"
        :barrios="problematicas.localidadesPresentes.length"
        :categorias="problematicas.categoriasPresentes.length"
        :ready="metricsReady"
      />

      <HomeMapPreview :reportes="mapaReportes" />

      <HomeRecentList :reportes="recientes" />

      <HomeCategoryGrid />

      <HomeSteps />

      <HomeUrbanAnalytics
        :resumen="problematicas.resumenPorCategoria"
        :urgentes="urgentesCount"
        :localidades="problematicas.localidadesPresentes.length"
      />

      <HomeSpotlight :reportes="spotlight" />

      <HomeFinalCta :is-authenticated="isAuthenticated" />

      <HomeSiteFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import HomeCategoryGrid from '@/components/home/HomeCategoryGrid.vue'
import HomeFinalCta from '@/components/home/HomeFinalCta.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeMapPreview from '@/components/home/HomeMapPreview.vue'
import HomeMetrics from '@/components/home/HomeMetrics.vue'
import HomeRecentList from '@/components/home/HomeRecentList.vue'
import HomeSiteFooter from '@/components/home/HomeSiteFooter.vue'
import HomeSpotlight from '@/components/home/HomeSpotlight.vue'
import HomeSteps from '@/components/home/HomeSteps.vue'
import HomeUrbanAnalytics from '@/components/home/HomeUrbanAnalytics.vue'
import { useAuthStore } from '@/stores/auth'
import { useProblematicasStore } from '@/stores/problematicas'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { user, isAuthenticated, effectiveRole } = storeToRefs(authStore)

const problematicas = useProblematicasStore()

const showForbidden = computed(() => route.query.forbidden === '1')

const metricsReady = ref(false)

const resueltosCount = computed(
  () => problematicas.reportesPorEstado('resuelto').length,
)

const urgentesCount = computed(
  () =>
    problematicas.reportes.filter(
      (r) =>
        (r.prioridad === 'alta' || r.prioridad === 'critica') &&
        r.estado !== 'resuelto' &&
        r.estado !== 'cerrado',
    ).length,
)

const recientes = computed(() => problematicas.ordenadosPorFecha(true).slice(0, 4))

const mapaReportes = computed(() => problematicas.ordenadosPorFecha(true).slice(0, 10))

const spotlight = computed(() => {
  const list = problematicas.reportes.filter(
    (r) => r.prioridad === 'critica' || r.prioridad === 'alta',
  )
  return list.slice(0, 3)
})

function clearForbidden() {
  void router.replace({ name: 'home', query: {} })
}

onMounted(() => {
  window.setTimeout(() => {
    metricsReady.value = true
  }, 480)
})
</script>
