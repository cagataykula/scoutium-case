import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import View1 from '@/views/View1.vue'

const routes = [
  {
    path: '/', component: Home,
  },
  {
    path: '/view-1', component: View1,
  }
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router