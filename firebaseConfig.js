// lib/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJJ1YFE8Yc9MDr5b9J8KQmAa1aDKimK-c",
    authDomain: "rizvidev-6b1ad.firebaseapp.com",
    projectId: "rizvidev-6b1ad",
    storageBucket: "rizvidev-6b1ad.appspot.com",
    messagingSenderId: "302461667286",
    appId: "1:302461667286:web:6a1fc4953b325480270677",
    measurementId: "G-MJ81225J6F"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth,storage };
