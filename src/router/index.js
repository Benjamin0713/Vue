import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/china",
    component: () => import("@/views/ChinaChart.vue")
  },
  {
    path: "/world",
    component: () => import("@/views/WorldChart.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
