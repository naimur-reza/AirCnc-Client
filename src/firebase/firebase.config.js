import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBkgntYTWbRWhnlnLD-zsGBHxnjbYbOVLc",
  authDomain: "travelar-guru.firebaseapp.com",
  projectId: "travelar-guru",
  storageBucket: "travelar-guru.appspot.com",
  messagingSenderId: "532288541779",
  appId: "1:532288541779:web:19e77bb71e29497e3322a6",
  measurementId: "G-789V9LZHJ9",
};

export const app = initializeApp(firebaseConfig);
