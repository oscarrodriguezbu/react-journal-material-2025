// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//react-cursos-2025-testing
const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_DATABASEURL,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

// console.log(process.env);
// console.log( import.meta.env );

// Your web app's Firebase configuration. Esto es del curso de react
// Dev/Prod
// const firebaseConfig = {
// apiKey: "AIzaSyC9qM8LKYti4TZus0g00ISzMjudet-H2vg",
// authDomain: "react-cursos-4368a.firebaseapp.com",
// projectId: "react-cursos-4368a",
// storageBucket: "react-cursos-4368a.appspot.com",
// messagingSenderId: "35683178704",
// appId: "1:35683178704:web:2cab2003319bbac2eba6d5"
// };

//! Mi firebase, esto debe ir en .env porque ese archivo no se sube por el gitIgnore. Usar el .env.template y cambiarle el nombre a .env
// const firebaseConfig = {
//   apiKey: "AIzaSyCCgg1UE81xwt-ooZnyu2fKJMiv4Quk8s0",
//   authDomain: "react-cursos-49a9b.firebaseapp.com",
//   projectId: "react-cursos-49a9b",
//   storageBucket: "react-cursos-49a9b.firebasestorage.app",
//   messagingSenderId: "439471861144",
//   appId: "1:439471861144:web:3389d57258af5da37d0fed"
// };

// Testing de db del curso
// const firebaseConfig = {
//   apiKey: "AIzaSyDyLJugXH7YFgmHb-rMLYlxT1YwtkgYR7E",
//   authDomain: "tracker-8f49f.firebaseapp.com",
//   databaseURL: "https://tracker-8f49f.firebaseio.com",
//   projectId: "tracker-8f49f",
//   storageBucket: "tracker-8f49f.appspot.com",
//   messagingSenderId: "145943821416",
//   appId: "1:145943821416:web:12e973eaa8b630a444cfdd"
// };

//testing de mi db
// const firebaseConfig = {
//   apiKey: "AIzaSyDAiUnaPMY2QgpuGbSvwOLdDLPrXq4-sP0",
//   authDomain: "react-cursos-2025-testing.firebaseapp.com",
//   projectId: "react-cursos-2025-testing",
//   storageBucket: "react-cursos-2025-testing.firebasestorage.app",
//   messagingSenderId: "517631398123",
//   appId: "1:517631398123:web:d375759570a3cab33d2eae"
// };

//prod
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  databaseURL: VITE_DATABASEURL,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig); //puede usarste en testing por si acaso
export const FirebaseAuth = getAuth(FirebaseApp); //tiene todas las funcionalidades de autenticacion
export const FirebaseDB = getFirestore(FirebaseApp); //es la configuracion de la base de datos
