 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

  const firebaseConfig = {apiKey: "AIzaSyAMOEWa_cTOIAAFItBbTvvKoR4E9M2RH40",
  authDomain: "tad-manager-47444.firebaseapp.com",
  projectId: "tad-manager-47444",
  storageBucket: "tad-manager-47444.firebasestorage.app",
  messagingSenderId: "77084257905",
  appId: "1:77084257905:web:20a01999b7a9299e72b5d0",
  measurementId: "G-0FSJXEN7TW"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  window.handleSubmit = async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    try {
      await addDoc(collection(db, "contacts"), {
        name: name,
        phone: phone,
        message: message,
        type: "견적문의",
        timestamp: serverTimestamp()
      });
      alert("문의가 정상적으로 접수되었습니다.");
      location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };