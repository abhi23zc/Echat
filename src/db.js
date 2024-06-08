
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBr5wbygjEQnIT5QrUYOtcz8gGQbXfUtZQ",
  authDomain: "immortal-477dc.firebaseapp.com",
  projectId: "immortal-477dc",
  storageBucket: "immortal-477dc.appspot.com",
  messagingSenderId: "382305915590",
  appId: "1:382305915590:web:ee14cba39014053c6a3dc7"
};


export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
