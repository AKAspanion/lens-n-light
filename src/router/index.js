import Vue from 'vue';
import firebase from "firebase";
import VueRouter from 'vue-router';

import Admin from '../pages/Admin.vue'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Photo from '../pages/Photo.vue'
import Contact from '../pages/Contact.vue'
import Landing from '../pages/Landing.vue'
import Portfolio from '../pages/Portfolio.vue'
import NotFound from '../pages/NotFound.vue'

import {
    initializeFirebase
} from '../firebase'


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            id: 0,
            path: '/',
            component: Landing,
            meta: {
                index: 0
            }
        }, 
        {
            id: 1,
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                index: 1
            }
        }, 
        {
            id: 2,
            path: '/photo/:id',
            name: 'Photo',
            component: Photo,
            meta: {
                index: 2
            }
        },
        {
            id: 3,
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                index: 3
            }
        },
        {
            id: 4,
            path: '/admin',
            name: 'Admin',
            component: Admin,
            meta: {
                admin: true,
                index: 4
            }
        }, 
        {
            id: 5,
            path: '/portfolio',
            name: 'Portfolio',
            component: Portfolio,
            meta: {
                index: 5
            }
        },
        {
            id: 6,
            path: '/contact',
            name: 'Contact',
            component: Contact,
            meta: {
                index: 6
            }
        },
        {
            id: 7,
            path: '*',
            name: 'NotFound',
            component: NotFound,
            meta: {
                index: 10
            }
        }

    ]
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

export default router