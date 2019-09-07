import * as firebase from 'firebase'


var auth = null;
var storage = null;
var storageRef = null;
var photosRef = null;
var messagesRef = null;
var photoCategoryRef = null;

var firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_DOMAIN,
    databaseURL: process.env.VUE_APP_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE,
    messagingSenderId: process.env.VUE_APP_MESSAGING_ID,
    appId: process.env.VUE_APP_APP_ID
};

export const initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    storage = firebase.storage();
    storageRef = firebase.storage().ref();
    photosRef = firebase.firestore().collection("photos");
    messagesRef = firebase.firestore().collection("messages");
    photoCategoryRef = firebase.firestore().collection("photo-category");
}

export const signIn = (user) => {
    return auth.signInWithEmailAndPassword(user.email, user.password);
}

export const getUser = () => {
    return firebase.auth().currentUser;
}

export const signOut = () => {
    return auth.signOut();
}

export const uploadFile = (file) => {
    const fileName = file.name;
    const extension = fileName.slice(fileName.lastIndexOf("."));
    return storage
        .ref("photos/" + _id() + extension)
        .put(file);
}

export const getURL = (fileName) => {
    return storageRef.child(fileName).getDownloadURL();
}

export const addPhoto = (photo) => {
    return photosRef.add(photo);
}

export const editPhoto = (photo) => {
    return photosRef.doc(photo.id).update({
        caption: photo.caption,
        location: photo.location,
        categoryId: photo.categoryId,
        description: photo.description
    });
}

export const deletePhoto = (id) => {
    return photosRef.doc(id).delete();
}

export const deleteCategory = (id) => {
    return photoCategoryRef.doc(id).delete();
}

export const deletePhotoFromStorage = (fileName) => {
    return storageRef.child(fileName).delete();
}

export const addCategory = (category) => {
    return photoCategoryRef.add(category);
}

export const editCategory = (category) => {
    return photoCategoryRef.doc(category.id).update({
        description: category.description,
        title: category.title,
        icon: category.icon
    });
}

export const addMessage = (message) => {
    return messagesRef.add(message);
}

export const fetchAllPhotos = () => {
    return photosRef.get();
}

export const fetchAllCategory = () => {
    return photoCategoryRef.get();
}

export const fetchAllMessages = () => {
    return messagesRef.get();
}

export const fetchMessageByEmail = (email) => {
    return messagesRef.where("email", '==', email).get();
}


export const fetchPhotosByCategory = (category) => {
    return photosRef.where("categoryId", '==', category.id).get();
}

const _id = () => {
    return '_' + Math.random().toString(36).substr(2, 18);
}