<template>
  <footer
    class="home-fade-up mt-20 border-t border-brand-navy/10 pt-14 pb-8"
    style="animation-delay: 0.24s"
  >
    <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <div class="lg:col-span-2">
        <p class="text-lg font-bold text-brand-navy">
          BarrioVisible
        </p>
        <p class="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          Laboratorio cívico-académico para registrar problemáticas barriales, visualizarlas en mapa y analizar patrones con enfoque de
          <span class="font-medium text-brand-teal">ODS 11</span>
          (ciudades y comunidades sostenibles).
        </p>
        <p class="mt-4 text-xs text-slate-500">
          Stack: Vue 3 · Vite · TypeScript · Pinia · Vue Router · Tailwind CSS · Leaflet · datos mock.
        </p>
      </div>
      <div>
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Enlaces
        </p>
        <ul class="mt-3 space-y-2 text-sm">
          <li>
            <RouterLink
              class="text-brand-teal hover:text-brand-navy"
              to="/explorar"
            >
              Explorar reportes
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="text-brand-teal hover:text-brand-navy"
              to="/mapa"
            >
              Mapa completo
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="text-brand-teal hover:text-brand-navy"
              to="/login"
            >
              Iniciar sesión
            </RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Código
        </p>
        <ul class="mt-3 space-y-2 text-sm">
          <li>
            <a
              class="text-brand-teal hover:text-brand-navy"
              href="https://github.com/YerenPalacios/BarrioVisible/"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li>
            <span class="text-slate-500">Demo sin backend</span>
          </li>
        </ul>
      </div>
    </div>
    <p class="mt-10 text-center text-xs text-slate-400">
      © {{ year }} BarrioVisible · Prototipo de civic tech para Bogotá.
    </p>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
