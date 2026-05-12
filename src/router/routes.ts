import type { RouteRecordRaw } from 'vue-router'

const MainLayout = () => import('@/layouts/MainLayout.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { permissions: ['content.home'] },
      },
      {
        path: 'explorar',
        name: 'explorar',
        component: () => import('@/views/ExplorarView.vue'),
        meta: { permissions: ['content.explore'] },
      },
      {
        path: 'reportes/:id',
        name: 'problematica-detalle',
        component: () => import('@/views/ProblematicaDetalleView.vue'),
        meta: { permissions: ['content.explore'] },
      },
      {
        path: 'mapa',
        name: 'mapa',
        component: () => import('@/views/MapaCompletoView.vue'),
        meta: { permissions: ['content.explore'] },
      },
      {
        path: 'aula',
        name: 'aula',
        component: () => import('@/views/AulaView.vue'),
        meta: {
          requiresAuth: true,
          roles: ['estudiante'],
          permissions: ['aula.access'],
        },
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/AdminDashboardView.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin'],
          permissions: ['admin.panel'],
        },
      },
      {
        path: ':pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
      },
    ],
  },
]
