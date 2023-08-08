import { initializeApp } from "firebase/app";
import { FIREBASE_APIKEY, FIREBASE_APPID, FIREBASE_MESSAGINGSENDERID } from "../config";

const firebaseConfig = {
    apiKey: FIREBASE_APIKEY,
    authDomain: "matstracks.firebaseapp.com",
    projectId: "matstracks",
    storageBucket: "matstracks.appspot.com",
    messagingSenderId: FIREBASE_MESSAGINGSENDERID,
    appId: FIREBASE_APPID
};

export const app = initializeApp(firebaseConfig);