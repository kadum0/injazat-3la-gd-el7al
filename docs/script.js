
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

    // ui-js


    // ui-js-data



    // getting

    onAuthStateChanged(bygreenAuth, async(user)=>{
        if(user){
            console.log('from auth ', user)
            authUser = user
        }

        getDocs(collection(injazatDb, 'publicline-comments')).then((data)=>{
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
                            name = 'notregisteredNormal'
                        }else if(list == notregisteredSuggest){
                            name = 'notregisteredSuggest'
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

                // registeredNormal.forEach(regNor=>{
                //     document.querySelector("#registeredNormal").innerHTML+= `
                // <div class="comment">
                //     <h5>${regNor.writer}</h5>
                //     <p>${regNor.comment}</p>
                //     <h6>${regNor.date}</h6>
                // </div>
                //     `
                // })

                // document.querySelector('loadRegisteredNormal').querySelector('span').addEventListener('click', ev=>{
                //     console.log(ev.target)
                //     // loadMoreComments(registeredNormal, ev.target.parentElement, registeredNormalCI)
                // })
                

                // console.log("sorted comments", docs)
        })
    })

// sending

document.querySelector('#sendComment').addEventListener('click', (ev)=>{

        console.log('comment, ', document.querySelector('#commentContent').value, )
    // check if written comment; 
    if(document.querySelector('#commentContent').value){

        console.log("will send a comment")
        addDoc(collection(injazatDb, 'publicline-comments'), {
            writer: document.querySelector('#commentWriter').value,
            comment: document.querySelector('#commentContent').value,
            suggest: document.querySelector('#suggest').checked,
            date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
            registered: authUser?true:false
        }).then(data=>{
            console.log("comment sent")
            window.location.reload();
        }
        )
    }
})


// functions

function uncheckOther(selected) {
    document.querySelectorAll('input[name="radio"]').forEach(function(radio) {
        if (radio != selected) {
        radio.checked = false;
        }
    });
}

function loadMoreComments(commentList, domToAdd, iterator){
    
    for (let i = 0; i < 5; i++) { 
        console.log("Hi!")

        // make comment object
        let commentObject = `
        <div class="comment">
            <h5>${commentList[iterator].writer}</h6>
            <p>${commentList[iterator].comment}</p>
            <h6>${commentList[iterator].date}</h6>
        </div>
        `

        // add to container
        domToAdd.innerHTML+=commentObject

        // ???
        // check if there are more comments to display logo else to break
        if(commentList.length == iterator){
            // no more comments
            break
        }else{
            if(i==5){
                // display icon
                let loadMoreObject = document.createElement('span')
                loadMoreObject.textContent ='load more ...'
                loadMoreObject.addEventListener('click', (ev)=>{
                    loadMoreComments()
                })

                domToAdd.append(loadMoreObject)
            }
        }
    }
}


// load five comments, loop over the list for five times

