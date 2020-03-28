import Firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDftOy-HCtgqFWq9H-FsP-Yoi8BuXLe9Ks",
    authDomain: "smart-shower-master.firebaseapp.com",
    databaseURL: "https://smart-shower-master.firebaseio.com",
    projectId: "smart-shower-master",
    storageBucket: "gs://smart-shower-master.appspot.com",
    messagingSenderId: "47252297776"
};

let app = Firebase.initializeApp(config)
export const db = app.database();