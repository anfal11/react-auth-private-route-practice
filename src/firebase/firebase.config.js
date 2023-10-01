import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDuXPxjqvYbCbgmuiAzl5dfZlvLLZ9kk0",
  authDomain: "react-auth-private-route-4274e.firebaseapp.com",
  projectId: "react-auth-private-route-4274e",
  storageBucket: "react-auth-private-route-4274e.appspot.com",
  messagingSenderId: "879720406536",
  appId: "1:879720406536:web:27759881b7efb44981bbbd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;