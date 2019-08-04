import * as firebase from 'firebase'

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
}
export const uploadFile = (file) => {
    const fileName = file.name;
    const extension = fileName.slice(fileName.lastIndexOf("."));
    return firebase
        .storage()
        .ref("photos/" + "abcf" + extension)
        .put(file);
}

export const getURL = (fileName) => {
    let storageRef = firebase.storage().ref();
    return storageRef.child(fileName).getDownloadURL();
}