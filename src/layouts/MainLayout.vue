<template>
  <div class="flex min-h-screen flex-col bg-brand-surface text-slate-900">
    <AppNavbar />
    <main class="flex-1 px-4 py-6 md:px-8">
      <RouterView />
    </main>
    <WhatsAppReportFab />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue'
import WhatsAppReportFab from '@/components/WhatsAppReportFab.vue'
</script>
