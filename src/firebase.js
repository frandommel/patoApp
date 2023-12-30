import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBP7_QKks01SyI1ER4ezd3ZYrD_dJmvg8M",
  authDomain: "patoimgdb.firebaseapp.com",
  projectId: "patoimgdb",
  storageBucket: "patoimgdb.appspot.com",
  messagingSenderId: "294486421175",
  appId: "1:294486421175:web:5e66b9e5265be7f7dba732",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
