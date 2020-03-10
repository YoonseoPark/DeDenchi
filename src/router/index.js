import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'select_file',
    props: true,
    component: () => import(/* webpackChunkName: "select_file" */ '../views/Select_File.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    props: true,
    component: () => import(/* webpackChunkName: "edit" */ '../views/Edit.vue')
  },
  {
    path: '/result',
    name: 'result',
    props: true,
    component: () => import(/* webpackChunkName: "result" */ '../views/Result.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
