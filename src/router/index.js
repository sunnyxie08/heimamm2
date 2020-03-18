import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../view/login/index.vue'

Vue.use(VueRouter)
var router = new VueRouter({
    routes: [{
        path: '/login',
        component: login
    }]
})

export default router