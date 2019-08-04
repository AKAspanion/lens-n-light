import Vue from 'vue'
import VueRouter from 'vue-router'

import PhotoUpload from '../pages/PhotoUpload.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/upload',
            name: 'Upload',
            component: PhotoUpload
        }
    ]
})