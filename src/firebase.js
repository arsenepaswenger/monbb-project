import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Tes clés secrètes Firebase (à copier depuis ta console Firebase)

const firebaseConfig = {
  apiKey: "AIzaSyA7TysE6jNy3ugkCyLMCKLUk9glVtIEd4o",
  authDomain: "jherese-app-e2f40.firebaseapp.com",
  projectId: "jherese-app-e2f40",
  storageBucket: "jherese-app-e2f40.firebasestorage.app",
  messagingSenderId: "581787401898",
  appId: "1:581787401898:web:3f08f6f01d0904c7dbdad3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // C'est le gardien de la porte !