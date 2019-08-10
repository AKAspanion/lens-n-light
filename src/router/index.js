import Vue from 'vue';
import firebase from "firebase";
import VueRouter from 'vue-router';
import NProgress from 'nprogress';

import '../../node_modules/nprogress/nprogress.css'

import Admin from '../pages/Admin.vue'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import PhotoUpload from '../pages/PhotoUpload.vue'
import NotFound from '../pages/NotFound.vue'

import {
    initializeFirebase
} from '../firebase'


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            id: 1,
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            id: 2,
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            id: 3,
            path: '/admin',
            name: 'Admin',
            component: Admin,
            meta: {
                admin: true
            },
            children: [{
                    id: 4,
                    path: 'upload',
                    name: 'Upload',
                    component: PhotoUpload
                },
            ]
        },{
            id: 0,
            path: '*',
            component: NotFound
        }

    ]
})
router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next()
})

router.beforeEach((to, from, next) => {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    if (to.matched.some(record => record.meta.admin)) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                next({
                    path: '/login',
                    redirect: from.fullPath
                })
            } else {
                next();
            }
        })
    } else {
        next();
    }
})

router.afterEach(() => {
    NProgress.done()
})

export default router