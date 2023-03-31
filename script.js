
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
const bygreenAuth = getAuth(bygreen)

const injazatConfig = {
    apiKey: "AIzaSyDL02ar9hgx6XBNHGV-YGnWA2qVlOvqAac",
    authDomain: "injazat-ec00d.firebaseapp.com",
    projectId: "injazat-ec00d",
    storageBucket: "injazat-ec00d.appspot.com",
    messagingSenderId: "65478306645",
    appId: "1:65478306645:web:d44ae118fe59a6b15adddc",
    measurementId: "G-L9MRQBND7L"
    };


    const injazat = initializeApp(injazatConfig, 'injazat');
    const injazatDb = getFirestore(injazat)


    const currentDate = new Date()
    let authUser 




////////////// ui-js
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

// comments di
registeredCommentsDi.addEventListener('click', ev=>{
    ev.target.classList.toggle('on')
    if(ev.target.classList.contains('on')){
        document.querySelector('#notRegisteredCommentsDi').classList.remove('on')

        document.querySelector('#registeredCommentList').style.display = 'block'
        document.querySelector('#notRegisteredCommentList').style.display = 'none'
    }
})
notRegisteredCommentsDi.addEventListener('click', ev=>{
    ev.target.classList.toggle('on')
    if(ev.target.classList.contains('on')){
        document.querySelector('#registeredCommentsDi').classList.remove('on')

        document.querySelector('#registeredCommentList').style.display = 'none'
        document.querySelector('#notRegisteredCommentList').style.display = 'block'
    }
})



///////////// getting data; 

// containers; may no need to them; ??
let routes
let pins

let loadingImages = [
    './imgs/wonder.gif', 
    './imgs/wonder1.png', 
    './imgs/wonder2.png', 
    './imgs/wonder3.png', 
    './imgs/wonder4.png', 
    './imgs/wonder5.png', 
    './imgs/wonder6.png', 
    './imgs/wonder7.png', 
    './imgs/wonder8.png'
]

onAuthStateChanged(bygreenAuth, async(user)=>{

    document.querySelector('#loadingMessage').querySelector('img').setAttribute('src', loadingImages[Math.floor(Math.random() * loadingImages.length)])
    document.querySelector('#loadingMessage').style.display = 'block'
    // document.querySelector('#loadingMessage').textContent = 'getting data'


    if(user){
        console.log('from auth ', user)
        authUser = user
    }


    ///////////////////to fix; minimal
    // // git4v
    // getDocs(collection(bygreenDb, 'users')).then((data)=>{
    //     let docs = []
    //         data.docs.forEach(doc=>{
    //             docs.push({...doc.data(), id: doc.id})
    //         })
    //         console.log('accounts; ', docs)
    //         document.querySelector('#accountsCounter').textContent = docs.length

    //         // count the contributions
    // })


    // // publicline
    // getDocs(collection(bygreenDb, 'routes')).then((data)=>{
    //     let docs = []
    //         data.docs.forEach(doc=>{
    //             docs.push({...doc.data(), id: doc.id})
    //         })
    //         routes = docs
    //         console.log('routes; ', routes)

    //         document.querySelector('#confirmedRoutesCounter').textContent = docs.length

    //         let votes = 0
    //         docs.forEach(route=> votes += (route.upvotes.length + route.downvotes.length))
    //         document.querySelector('#votesCounter').innerHTML = votes

    //         document.querySelector('#completedRoutesCounter').textContent = routes.filter(route=>route.start && route.end).length
    //         document.querySelector('#uncompletedRoutesCounter').textContent = routes.filter(route=>!route.start || !route.end).length

    //         // the sured routes; later
    // })

    // getDocs(collection(bygreenDb, 'unroutes')).then((data)=>{
    //     let docs = []
    //         data.docs.forEach(doc=>{
    //             docs.push({...doc.data(), id: doc.id})
    //         })
    //         console.log('unroutes; ', docs)

    //         document.querySelector('#unconfirmedRoutesCounter').textContent = docs.length
    // })

    // // bygreen
    // getDocs(collection(bygreenDb, 'pins')).then((data)=>{
    //     let docs = []
    //         data.docs.forEach(doc=>{
    //             docs.push({...doc.data(), id: doc.id})
    //         })
    //         pins = docs
    //         console.log('pins', pins)

    //         document.querySelector('#redPinsCounter').textContent = pins.filter(pin=>!pin.afterImgs).length
    //         document.querySelector('#greenPinsCounter').textContent = pins.filter(pin=>pin.afterImgs).length
    //         document.querySelector('#yellowPinsCounter').textContent = pins.filter(pin=>pin.next).length

    //         // the planted plants; later
    // })

    // getDocs(collection(bygreenDb, 'shop')).then((data)=>{
    //     let docs = []
    //         data.docs.forEach(doc=>{
    //             docs.push({...doc.data(), id: doc.id})
    //         })
    //         // pins = docs
    //         console.log('shops', docs)

    //         document.querySelector('#shopsCounter').textContent = docs.length
    // })



    // comments
    
    await getDocs(collection(injazatDb, 'injazat-comments')).then((data)=>{
        let docs = []
            data.docs.forEach(doc=>{
                docs.push({...doc.data(), id: doc.id})
            })
            console.log('comments; ', docs)
            // count the contributions

            let registeredNormal = docs.filter(doc=>doc.registered && !doc.suggest)
            let registeredSuggest = docs.filter(doc=>doc.suggest && doc.suggest)
            let notregisteredNormal = docs.filter(doc=>!doc.registered && !doc.suggest)
            let notregisteredSuggest= docs.filter(doc=>!doc.registered && doc.suggest )

            let lists = []
            lists.push(registeredNormal)
            lists.push(registeredSuggest)
            lists.push(notregisteredNormal)
            lists.push(notregisteredSuggest)

            let registeredNormalCI = 0
            let registeredSuggestCI = 0
            let normalCI = 0
            let suggestCI = 0

            lists.forEach((list)=>{
                list.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    // return dateA.getTime() - dateB.getTime();
                    return dateB.getTime() - dateA.getTime();
                });

                list.forEach(regNor=>{
                    console.log(regNor)
                    let name 
                    if(list == registeredNormal){
                        name = 'registeredNormal'
                    }else if(list == registeredSuggest){
                        name = 'registeredSuggest'
                    }else if(list == notregisteredNormal){
                        name = 'notRegisteredNormal'
                    }else if(list == notregisteredSuggest){
                        name = 'notRegisteredSuggest'
                    }

                document.querySelector('#'+ name).innerHTML+= `
                <div class="comment">
                    <h5>${regNor.writer}</h5>
                    <p>${regNor.comment}</p>
                    <h6>${regNor.date}</h6>
                </div>
                `
                })
            })
    })

    console.log("got all the data")
    document.querySelector('#loadingMessage').style.display = 'none'

})



////////////sending

document.querySelector('#sendComment').addEventListener('click', (ev)=>{

    console.log('comment, ', document.querySelector('#commentContent').value, )
// check if written comment; 
if(document.querySelector('#commentContent').value){

    console.log("will send a comment")
    document.querySelector('#loadingMessage').style.display = 'block'
    document.querySelector('#loadingMessage').textContent = 'sending'


    addDoc(collection(injazatDb, 'publicline-comments'), {
        writer: document.querySelector('#commentWriter').value,
        comment: document.querySelector('#commentContent').value,
        suggest: document.querySelector('#suggest').checked,
        date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
        registered: authUser?true:false
    }).then(data=>{
        console.log("comment sent")
        document.querySelector('#loadingMessage').textContent = 'sent'
        location.reload()

        setTimeout(() => {
            document.querySelector('#loadingMessage').style.display = 'none'
        }, 1000);


        window.location.reload();
    }
    )
}
})



