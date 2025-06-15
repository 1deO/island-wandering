import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBeYKgbTOMA5SL2WFIdqgrPS_jEh3HDg9o",
  authDomain: "guguclass-640db.firebaseapp.com",
  databaseURL: "https://guguclass-640db-default-rtdb.firebaseio.com",
  projectId: "guguclass-640db",
  storageBucket: "guguclass-640db.firebasestorage.app",
  messagingSenderId: "653753352244",
  appId: "1:653753352244:web:cd1190fdf7b0c32256ca61",
  measurementId: "G-TB21QXMTBS"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp; 