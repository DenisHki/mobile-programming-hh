import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCTRHGErIv9mlaiTPOsUsnL9W8HHvGeMGo",
    authDomain: "todolist-196e5.firebaseapp.com",
    databaseURL:
      "https://todolist-196e5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todolist-196e5",
    storageBucket: "todolist-196e5.appspot.com",
    messagingSenderId: "958768477880",
    appId: "1:958768477880:web:d8eeeb7de6224bdb2e664d",
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;