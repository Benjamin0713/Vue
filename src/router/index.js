import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/ChinaChart",
    component: () => import("@/views/ChinaChart.vue")
  },
  {
    path: "/WorldChart",
    component: () => import("@/views/WorldChart.vue")
  },
  {
    path: "/Zhuzhuang",
    component: () => import("@/views/Zhuzhuang.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
