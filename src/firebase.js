import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDNYUE4LU376cM3xII4_bwtJcQpkU2Cu18",
  authDomain: "chat-app-f81cf.firebaseapp.com",
  projectId: "chat-app-f81cf",
  storageBucket: "chat-app-f81cf.appspot.com",
  messagingSenderId: "471446611423",
  appId: "1:471446611423:web:331b69352f8fad933e906a"
};
const app = initializeApp(firebaseConfig);
export const db=getFirestore()
export default app;
export const storage = getStorage(app);
export const provider=new GoogleAuthProvider();