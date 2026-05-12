<template>
  <section
    class="home-fade-up"
    style="animation-delay: 0.16s"
    aria-labelledby="home-pasos-titulo"
  >
    <h2
      id="home-pasos-titulo"
      class="text-2xl font-bold tracking-tight text-brand-navy"
    >
      Cómo funciona
    </h2>
    <p class="mt-1 max-w-2xl text-slate-600">
      Un flujo simple pensado para ciudadanía, academia y equipos que transforman datos en acción.
    </p>

    <ol class="mt-10 grid gap-6 md:grid-cols-3">
      <li
        class="group relative rounded-2xl border border-slate-100/90 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-teal/25 hover:shadow-lg"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-surface text-lg font-bold text-brand-teal ring-1 ring-brand-navy/10 transition group-hover:bg-brand-teal/10"
        >
          1
        </div>
        <div
          class="mt-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy/90 to-brand-teal text-white shadow-md"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 class="mt-4 text-lg font-semibold text-brand-navy">
          Ciudadanía reporta
        </h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          Vecinos documentan problemáticas con contexto, ubicación y evidencia — sin burocracia innecesaria.
        </p>
      </li>
      <li
        class="group relative rounded-2xl border border-slate-100/90 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-teal/25 hover:shadow-lg"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-surface text-lg font-bold text-brand-teal ring-1 ring-brand-navy/10 transition group-hover:bg-brand-teal/10"
        >
          2
        </div>
        <div
          class="mt-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy/90 to-brand-teal text-white shadow-md"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 7l8-4 8 4M4 7v10l8 4 8-4V7M4 7l8 4 8-4"
            />
          </svg>
        </div>
        <h3 class="mt-4 text-lg font-semibold text-brand-navy">
          La plataforma organiza
        </h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          Clasificación, priorización y vistas urbanas para entender patrones por barrio y categoría.
        </p>
      </li>
      <li
        class="group relative rounded-2xl border border-slate-100/90 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-teal/25 hover:shadow-lg"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-surface text-lg font-bold text-brand-teal ring-1 ring-brand-navy/10 transition group-hover:bg-brand-teal/10"
        >
          3
        </div>
        <div
          class="mt-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy/90 to-brand-teal text-white shadow-md"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h3 class="mt-4 text-lg font-semibold text-brand-navy">
          Datos que orientan soluciones
        </h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          Indicadores listos para investigación, veeduría y diálogo con entidades — civic tech con rigor.
        </p>
      </li>
    </ol>
  </section>
</template>
