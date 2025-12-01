import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateFruit from '../views/CreateFruit.vue'
import EditFruit from '../views/EditFruit.vue'
import FruitDetail from '../views/FruitDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/create', component: CreateFruit },
  { path: '/edit/:id', component: EditFruit, props: true },
  { path: '/fruit/:id', component: FruitDetail, props: true }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
