import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: require('@/components/LandingPage').default
        },
        {
            path: '/config',
            name: 'config',
            component: require('@/components/Config').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})