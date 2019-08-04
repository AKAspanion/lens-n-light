import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        darkTheme: false,
        topLoader: false,
        images: []
    },
    mutations: {
        toggleTheme(state, payload) {
            state.darkTheme = payload;
        },
        uploadPhoto(state, payload) {
            state.images.push(payload);
        },
        setTopLoader(state, payload) {
            state.topLoader = payload;
        }
    },
    actions: {
        toggleTheme({
            commit
        }, payload) {
            commit('toggleTheme', payload)
        },
        uploadPhoto({
            commit
        }, payload) {
            commit('uploadPhoto', payload)
        },
        setTopLoader({
            commit
        }, payload) {
            commit('setTopLoader', payload)
        }
    },
    getters: {
        loadTheme(state) {
            return state.darkTheme
        },
        topLoader(state) {
            return state.topLoader
        }
    }
})