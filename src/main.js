import Vue from 'vue'

import store from './store'
import router from './router'
import vuetify from './vuetify'
import * as firebase from 'firebase'

import {
    initializeFirebase
} from './firebase'

import App from './App.vue'

import "./assets/style.css";

Vue.config.productionTip = false

new Vue({
    el: '#app',
    vuetify,
    store,
    router,
    render: h => h(App),
    beforeCreate() {
        if (!firebase.apps.length) {
            initializeFirebase();
        }
    }
}).$mount('#app')