import { createRouter, createWebHistory } from 'vue-router'
import ListaFilmes from '../views/ListaFilmes.vue'
import DetalhesFilme from '../views/DetalhesFilme.vue'
import FormFilme from '../views/FormFilme.vue'

const routes = [
  { path: '/', name: 'lista', component: ListaFilmes },
  { path: '/filme/:titulo', name: 'detalhes', component: DetalhesFilme },
  { path: '/novo', name: 'novo', component: FormFilme },
  { path: '/editar/:titulo', name: 'editar', component: FormFilme },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
