import Vue from 'vue'
import VueRouter from 'vue-router'

import PhotoUpload from '../pages/PhotoUpload.vue'
import MainContainer from '../pages/MainContainer.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: MainContainer
        },
        {
            path: '/upload',
            name: 'Upload',
            component: PhotoUpload
        }
    ]
})