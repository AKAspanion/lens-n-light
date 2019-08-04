import Vue from 'vue'

import store from './store'
import router from './router'
import vuetify from './vuetify'
import {
    initializeFirebase
} from './firebase'

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    store,
    router,
    vuetify,
    render: h => h(App),
    created() {
        initializeFirebase();
    }
}).$mount('#app')