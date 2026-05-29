import { createRouter, createWebHistory } from 'vue-router'
import ListaFilmes from '../views/ListaFilmes.vue'
import DetalhesFilme from '../views/DetalhesFilme.vue'
import FormFilme from '../views/FormFilme.vue'
import Relatorio from '../views/Relatorio.vue'

const routes = [
  { path: '/', name: 'lista', component: ListaFilmes },
  { path: '/filme/:titulo', name: 'detalhes', component: DetalhesFilme },
  { path: '/novo', name: 'novo', component: FormFilme },
  { path: '/editar/:titulo', name: 'editar', component: FormFilme },
  { path: '/relatorio', name: 'relatorio', component: Relatorio },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
