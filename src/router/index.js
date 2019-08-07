import Vue from 'vue'
import VueRouter from 'vue-router'

import PhotoUpload from '../pages/PhotoUpload.vue'
import HomePage from '../pages/HomePage.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [        
        {
            path: '',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/upload',
            name: 'Upload',
            component: PhotoUpload
        }
    ]
})