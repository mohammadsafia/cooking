import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCKnHQJc2Mllr9lik5pKHZOqSDU3VGI1BA",
    authDomain: "react-cooking-site.firebaseapp.com",
    projectId: "react-cooking-site",
    storageBucket: "react-cooking-site.appspot.com",
    messagingSenderId: "709531750723",
    appId: "1:709531750723:web:3ce001025f339b94339ff6"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export {
    projectFirestore
}
