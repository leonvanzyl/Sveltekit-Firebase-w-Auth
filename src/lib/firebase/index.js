// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAvicbRLE5nDxlmotHkgZz_aQFAG4OoNFs',
	authDomain: 'realcost-f354a.firebaseapp.com',
	projectId: 'realcost-f354a',
	storageBucket: 'realcost-f354a.appspot.com',
	messagingSenderId: '725247144399',
	appId: '1:725247144399:web:1b200a27107fd01a2da2ba'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
