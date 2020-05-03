import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBcNEHFx27k6zaqO5dgV3PdZQdGqhaCsrc",
    authDomain: "crwn-db-da56b.firebaseapp.com",
    databaseURL: "https://crwn-db-da56b.firebaseio.com",
    projectId: "crwn-db-da56b",
    storageBucket: "crwn-db-da56b.appspot.com",
    messagingSenderId: "1812080544",
    appId: "1:1812080544:web:f8207e63e194c6f736e6c5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google auth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;