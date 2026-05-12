<template>
  <svg
    class="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    aria-hidden="true"
  >
    <template v-if="name === 'seguridad'">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V7l7-4z"
      />
      <path
        stroke-linecap="round"
        d="M9 12l2 2 4-4"
      />
    </template>
    <template v-else-if="name === 'vial'">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4 18h16M6 14l3-8h6l3 8"
      />
      <path
        stroke-linecap="round"
        d="M9 18v2M15 18v2"
      />
    </template>
    <template v-else-if="name === 'basuras'">
      <rect
        x="5"
        y="7"
        width="14"
        height="12"
        rx="2"
      />
      <path
        stroke-linecap="round"
        d="M8 7V5a1 1 0 011-1h6a1 1 0 011 1v2M9 11h6"
      />
    </template>
    <template v-else-if="name === 'espacio'">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4 20h16M6 16l4-12 4 8 4-6 4 10"
      />
    </template>
    <template v-else-if="name === 'movilidad'">
      <circle
        cx="8"
        cy="16"
        r="2.5"
      />
      <circle
        cx="17"
        cy="16"
        r="2.5"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5 16H3l2-6h6l1 3h5l2 3h-2"
      />
    </template>
    <template v-else-if="name === 'ruido'">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11 5L6 9H3v6h3l5 4V5z"
      />
      <path
        stroke-linecap="round"
        d="M15.54 8.46a5 5 0 010 7.07M17.66 6.34a8 8 0 010 11.32"
      />
    </template>
    <template v-else-if="name === 'alumbrado'">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 18h6M10 22h4M12 3v1M8 5h8M8 21h8"
      />
      <path
        stroke-linecap="round"
        d="M12 6v11"
      />
    </template>
    <template v-else>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3c4 3 6 6 6 10a6 6 0 11-12 0c0-4 2-7 6-10z"
      />
      <path
        stroke-linecap="round"
        d="M12 8v4M10 14h4"
      />
    </template>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>
