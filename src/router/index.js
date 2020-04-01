import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Registered from '../views/Registered.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import User from '../views/User.vue'
import NotFoundComponent from '../components/NotFoundComponent.vue'

import { store } from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registered',
    name: 'Registered',
    component: Registered
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/users/:id',
    name: 'User',
    component: User,
    meta: {
      requiresAuth: true,
      requireAdmin: true
    }
  },
  { path: '*', component: NotFoundComponent }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth),
  requireAdmin = to.matched.some(x => x.meta.requireAdmin),
  currentUser = store.state.currentUser.status,
  admin = parseInt(store.state.currentUser.type) ===  1 ? true : false,
  typeUser = parseInt(store.state.currentUser.type) // Evalúa y devuelve el valor como entero, ya que local storage lo guarda como String

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if(requiresAuth && currentUser && requireAdmin && !admin) {
    next('/dashboard')
  } else if(requiresAuth && typeUser === 1 && requireAdmin && admin) {
    next()
  } else if(to.name === 'Home' && currentUser || to.name === 'Login' && currentUser) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
