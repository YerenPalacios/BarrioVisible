import { createPinia } from 'pinia'
import { createApp } from 'vue'

import faviconUrl from './assets/logo.png'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import './style.css'

function setFavicon(href: string) {
  let link = document.querySelector<HTMLLinkElement>("link[rel='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.type = 'image/png'
  link.href = href
}

setFavicon(faviconUrl)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
useAuthStore().restoreFromStorage()
app.use(router)
app.mount('#app')
