import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import Propiedades from '../views/Propiedades';
import Clientes from '../views/Clientes.vue';
import Agentes from '../views/Agentes.vue';
import Visitas from '../views/Visitas.vue';
import Contratos from '../views/Contratos.vue';
//import editPropiedad from '../components/propiedades/editPropiedad.vue';
//import createNew from '../components/propiedades/createNew.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
path: '/propiedades',
name: 'propiedades',
component: Propiedades
  },
  {
path: '/clientes',
name: 'clientes',
component: Clientes
  },
  {
path: '/agentes',
name: 'agentes',
component: Agentes
  },
  {
path: '/visitas',
name: 'visitas',
component: Visitas
  },
  {
path: '/contratos',
name: 'contratos',
component: Contratos
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
