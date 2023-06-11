import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: process.env.React_APP_ApiKey,
    authDomain: process.env.React_APP_AuthDomain,
    projectId: process.env.React_APP_ProjectId,
    storageBucket: process.env.React_APP_StorageBucket,
    messagingSenderId: process.env.React_APP_MessagingSenderId,
    appId: process.env.React_APP_AppId,
    measurementId: process.env.React_APP_MeasurementId,
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
