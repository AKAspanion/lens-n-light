import * as firebase from 'firebase'

var auth = null;
var storage = null;
var storageRef = null;
var photosRef = null;
var photoCategoryRef = null;

var firebaseConfig = {
    apiKey: 'AIzaSyBPHctcMw8Zi7aWL93VHYv4n84QH2zLvpY',
    authDomain: 'lens-n-light.firebaseapp.com',
    databaseURL: 'https://lens-n-light.firebaseio.com',
    projectId: 'lens-n-light',
    storageBucket: 'gs://lens-n-light.appspot.com',
    messagingSenderId: '623142729883',
    appId: '1:623142729883:web:9b73126a0be9f357'
};

export const initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    storage = firebase.storage();
    storageRef = firebase.storage().ref();
    photosRef = firebase.firestore().collection("photos");
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

export const addCategory = (category) => {
    return photoCategoryRef.add(category);
}

export const fetchAllPhotos = () => {
    return photosRef.get();
}

export const fetchAllCategory = () => {
    return photoCategoryRef.get();
}

export const fetchPhotosByCategory = (category) => {
    return photosRef.where("categoryId", '==', category.id).get();
}

const _id = () =>{
    return '_' + Math.random().toString(36).substr(2, 18);
}