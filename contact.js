import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = { 
    apiKey: "AIzaSyAMOEWa_cTOIAAFItBbTvvKoR4E9M2RH40",
    authDomain: "tad-manager-47444.firebaseapp.com",
    projectId: "tad-manager-47444",
    storageBucket: "tad-manager-47444.firebasestorage.app",
    messagingSenderId: "77084257905",
    appId: "1:77084257905:web:20a01999b7a9299e72b5d0",
    measurementId: "G-0FSJXEN7TW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {

    const cForm = document.getElementById('contact-form');
    if (cForm) {
        cForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const submitBtn = cForm.querySelector('.explore');
            const btnText = submitBtn.querySelector('.btn-text');

            if (submitBtn) {
                submitBtn.disabled = true;
                if(btnText) btnText.innerText = "전송 중...";
            }

            try {
                await addDoc(collection(db, "contacts"), {
                    name: document.getElementById('name').value,
                    phone: document.getElementById('phone').value,
                    message: document.getElementById('message').value,
                    type: "견적문의",
                    timestamp: serverTimestamp()
                });
                location.href = "./success.html"; 
            } catch (error) {
                console.error("Firebase 에러:", error);
                alert("전송 오류가 발생했습니다.");
                if (submitBtn) {
                    submitBtn.disabled = false;
                    if(btnText) btnText.innerText = "CONTACT US";
                }
            }
        });
    }
    const asForm = document.getElementById('as-form');
    if (asForm) {
        asForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = asForm.querySelector('.explore');
            const btnText = submitBtn.querySelector('.btn-text');

            if (submitBtn) {
                submitBtn.disabled = true;
                if(btnText) btnText.innerText = "전송 중...";
            }

            try {
                await addDoc(collection(db, "contacts"), {
                    name: document.getElementById('as-name').value,
                    phone: document.getElementById('as-phone').value,
                    message: document.getElementById('as-message').value,
                    type: "A/S신청", 
                    status: "pending",
                    timestamp: serverTimestamp()
                });
                
                location.href = "./success.html"; 
            } catch (error) {
                console.error("AS 전송 에러:", error);
                alert("전송 오류가 발생했습니다.");
                if (submitBtn) {
                    submitBtn.disabled = false;
                    if(btnText) btnText.innerText = "REQUEST A/S";
                }
            }
        });
    }
});