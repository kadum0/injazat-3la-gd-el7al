


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js"

import { getFirestore, onSnapshot,
	collection, doc, getDocs, getDoc,
	addDoc, deleteDoc, setDoc,
	query, where, orderBy, serverTimestamp,
	updateDoc, arrayUnion, arrayRemove} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

// firebase storage; 
import {getStorage, ref, uploadBytes, getDownloadURL, listAll, list} from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js'
    

const bygreenConfig = {
    apiKey: "AIzaSyDqK1z4fd7lO9g2ISbf-NNROMd7xpxcahc",
    authDomain: "bygreen-453c9.firebaseapp.com",
    projectId: "bygreen-453c9",
    storageBucket: "bygreen-453c9.appspot.com",
    messagingSenderId: "19954598250",
    appId: "1:19954598250:web:ba57c792bdf65dbc18a513",
    measurementId: "G-265TN8HGKX"};

const bygreen = initializeApp(bygreenConfig, 'bygreen');
const bygreenDb = getFirestore(bygreen)


// ui-js
document.querySelector('#translateToEn').addEventListener('click', (ev)=>{
    ev.target.classList.toggle('on')
    if(ev.target.classList.contains('on')){
        document.querySelectorAll('.en').forEach((enElement)=>enElement.style.display='block')
        document.querySelectorAll('.ar').forEach((arELement)=>arELement.style.display='none')
        ev.target.textContent = 'ar'
    }else{
        document.querySelectorAll('.en').forEach((enElement)=>enElement.style.display='none')
        document.querySelectorAll('.ar').forEach((arELement)=>arELement.style.display='block')
        ev.target.textContent = 'en'
    }
})








// getting; 

    // getDocs(collection(bygreenDb, 'users')).then((data)=>{
    //     let docs = []
    //         data.docs.forEach(doc=>{
    //             docs.push({...doc.data(), id: doc.id})
    //         })
    //         accountsList = docs
    //         console.log(docs)
    //         document.querySelector('#accountsCounter').textContent = accountsList.length
    //         if(accountsList){
    //             // console.log(accountsList, dbUser)
    //             ranking('total', 'de')
    //         }

    //     })


