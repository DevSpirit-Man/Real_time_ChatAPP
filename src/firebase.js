import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBcSlQgIyVzkp63G69YZMClMAR_NTa-f2o",
  authDomain: "whatsapp-clone-b61d1.firebaseapp.com",
  projectId: "whatsapp-clone-b61d1",
  storageBucket: "whatsapp-clone-b61d1.appspot.com",
  messagingSenderId: "824318794037",
  appId: "1:824318794037:web:7e37d3a262a76e3acf147c"
};
const app = initializeApp(firebaseConfig);
export const db=getFirestore()
export default app;
export const provider=new GoogleAuthProvider();