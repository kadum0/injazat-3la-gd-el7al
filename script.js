
// firebase 

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
    measurementId: "G-265TN8HGKX"
};

const bygreen = initializeApp(bygreenConfig, 'bygreen');
const bygreenDb = getFirestore(bygreen)


const injazatConfig = {
    apiKey: "AIzaSyDL02ar9hgx6XBNHGV-YGnWA2qVlOvqAac",
    authDomain: "injazat-ec00d.firebaseapp.com",
    projectId: "injazat-ec00d",
    storageBucket: "injazat-ec00d.appspot.com",
    messagingSenderId: "65478306645",
    appId: "1:65478306645:web:d44ae118fe59a6b15adddc",
    measurementId: "G-L9MRQBND7L"
    };


    const injazat = initializeApp(bygreenConfig, 'bygreen');
    const injazatDb = getFirestore(bygreen)





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




// getting data; 

// containers; may no need to them; ??
let routes
let pins

window.onload=()=>{

    // git4v
    getDocs(collection(bygreenDb, 'users')).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            console.log('accounts; ', docs)
            document.querySelector('#accountsCounter').textContent = docs.length

            // count the contributions
    })


    // publicline
    getDocs(collection(bygreenDb, 'routes')).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            routes = docs
            console.log('routes; ', routes)

            document.querySelector('#confirmedRoutesCounter').textContent = docs.length

            let votes = 0
            docs.forEach(route=> votes += (route.upvotes.length + route.downvotes.length))
            document.querySelector('#votesCounter').innerHTML = votes

            document.querySelector('#completedRoutesCounter').textContent = routes.filter(route=>route.start && route.end).length
            document.querySelector('#uncompletedRoutesCounter').textContent = routes.filter(route=>!route.start || !route.end).length

            // the sured routes; later
    })

    getDocs(collection(bygreenDb, 'unroutes')).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            console.log('unroutes; ', docs)

            document.querySelector('#unconfirmedRoutesCounter').textContent = docs.length
    })

    // bygreen
    getDocs(collection(bygreenDb, 'pins')).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            pins = docs
            console.log('pins', pins)

            document.querySelector('#redPinsCounter').textContent = pins.filter(pin=>!pin.afterImgs).length
            document.querySelector('#greenPinsCounter').textContent = pins.filter(pin=>pin.afterImgs).length
            document.querySelector('#yellowPinsCounter').textContent = pins.filter(pin=>pin.next).length

            // the planted plants; later
    })

    getDocs(collection(bygreenDb, 'shop')).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            // pins = docs
            console.log('shops', docs)

            document.querySelector('#shopsCounter').textContent = docs.length
    })
}


