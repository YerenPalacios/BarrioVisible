# BarrioVisible

Aplicación web de demostración para **visualizar y gestionar problemáticas vecinales** (datos mock, sin backend). Incluye inicio, exploración con filtros, mapa con Leaflet, detalle de reportes, login simulado y panel de administración.

## Stack

- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/) y [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- [Leaflet](https://leafletjs.com/) para el mapa

## Requisitos

- **Node.js** 20+ (recomendado; compatible con la versión indicada en `package.json`)

## Instalación y scripts

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # typecheck + build de producción
npm run preview  # vista previa del build
npm run typecheck
npm run lint
```

## Despliegue (GitHub Pages)

En `vite.config.ts` el proyecto usa `base: '/BarrioVisible/'` y el build genera salida en la carpeta **`docs/`**, pensado para publicación en GitHub Pages bajo ese subpath.

## Variables de entorno (opcional)

Crea un archivo `.env` en la raíz si quieres personalizar el botón flotante de WhatsApp:

| Variable | Descripción |
|----------|-------------|
| `VITE_WHATSAPP_REPORT_E164` | Número en formato E.164 **solo dígitos** (ej. `573001234567`). Si no se define, la app usa un valor de ejemplo para desarrollo. |

## Estructura principal

```
src/
  components/   # UI reutilizable (navbar, home, etc.)
  layouts/      # MainLayout
  views/        # Páginas por ruta
  stores/       # Pinia (auth, problemáticas)
  mock/         # Datos y usuarios de prueba
  router/
```

## Notas

- Los reportes y usuarios son **mock en memoria**; al recargar la página se pierden los cambios salvo lo que gestione el store hasta ese momento.
- En el panel **Admin** puedes editar, cambiar estado/prioridad y eliminar reportes (con confirmación), además de reiniciar el dataset mock.
