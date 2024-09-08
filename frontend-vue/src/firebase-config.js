import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// config firebase
const firebaseConfig = {
  apiKey: "AIzaSyAftJ9qz8hVHeQHjsBl9VYdY-0LuDV9SwM",
  authDomain: "ocerall-project.firebaseapp.com",
  projectId: "ocerall-project",
  storageBucket: "ocerall-project.appspot.com",
  messagingSenderId: "130414121447",
  appId: "1:130414121447:web:885c4c65b58280e7976d42",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };
