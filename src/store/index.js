import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        darkTheme: false,
        topLoader: false,
        landingVisited: false,
        snackBar: {
            model: false,
            text: ''
        },
        categories: [],
        photos: [],
        window: {},
        socialLinks: [{
                color: "#3b5998",
                name: "facebook",
                iconName: "mdi-facebook",
                href: "https://www.facebook.com/amitphotography/"
            },
            {
                color: "#dd2a7b",
                name: "instagram",
                iconName: "mdi-instagram",
                href: "https://www.instagram.com/amitsahoophotography/"
            }
        ]
    },
    mutations: {
        toggleTheme(state, payload) {
            state.darkTheme = payload;
        },

        landingVisited(state, payload) {
            state.landingVisited = payload;
        },
        uploadPhoto(state, payload) {
            state.images.push(payload);
        },
        setTopLoader(state, payload) {
            state.topLoader = payload;
        },
        showSnackBar(state, payload) {
            state.snackBar = payload;
        },
        loadCategories(state, payload) {
            state.categories = payload;
        },
        loadPhotos(state, payload) {
            state.photos = payload;
        }
    },
    actions: {
        LOAD_CATEGORIES({
            commit
        }, payload) {
            commit('loadCategories', payload)
        },
        LOAD_PHOTOS({
            commit
        }, payload) {
            commit('loadPhotos', payload)
        },
        landingVisited({
            commit
        }, payload) {
            commit('landingVisited', payload)
        },
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
        },
        showSnackBar({
            commit
        }, payload) {
            commit('showSnackBar', {
                model: true,
                text: payload
            })
        }
    },
    getters: {
        loadTheme(state) {
            return state.darkTheme
        },
        topLoader(state) {
            return state.topLoader
        },
        snackBar(state) {
            return state.snackBar;
        },
        landingVisited(state) {
            return state.landingVisited;
        },
        categories(state) {
            return state.categories;
        },
        photos(state) {
            return state.photos;
        },
    }
})