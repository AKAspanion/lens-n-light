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
        activeCategory: '',
        photosByCategory: {},
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
            },
            {
                color: "#1DA1F2",
                name: "twitter",
                iconName: "mdi-twitter",
                href: "https://twitter.com/amitsahoo94/"
            }
        ],
        otherLinks: [
            {
                color: "secondary",
                name: "getty-images",
                iconName: "getty",
                href: "https://www.gettyimages.in/photos/amit-kumar-sahoo"
            },
            {
                color: "#959595",
                name: "guru-shots",
                iconName: "gurushots",
                href: "https://gurushots.com/amitsahoo94/"
            },
            {
                color: "secondary",
                name: "eyeem",
                iconName: "eyeem",
                href: "https://www.eyeem.com/u/amitsahoophotography"
            },
            {
                color: "secondary",
                name: "500px",
                iconName: "500px",
                href: "https://500px.com/amits_click"
            },
            {
                color: "#FF0084",
                name: "flickr",
                iconName: "flickr",
                href: "https://www.flickr.com/photos/clickaddictamit/"
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
        },
        loadPhotosByCategory(state, payload) {
            state.photosByCategory = payload;
        },
        setCurrentCategory(state, payload) {
            state.activeCategory = payload;
        },
    },
    actions: {
        LOAD_PHOTOS_BY_CATEGORIES({
            commit
        }, payload) {
            commit('loadPhotosByCategory', payload)
        },
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
        ACTIVE_CATEGORY({
            commit
        }, payload) {
            commit('setCurrentCategory', payload)
        },
        LANDING_VISITED({
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
        photosByCategory(state) {
            return state.photosByCategory;
        },
        categories(state) {
            return state.categories;
        },
        photos(state) {
            return state.photos;
        },
        activeCategory(state) {
            return state.activeCategory;
        }
    }
})