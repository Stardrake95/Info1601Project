import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseApp = initializeApp ({
    apiKey: "AIzaSyBFPDSlVYKiW1mpKCbGYZiN94qF_WPg-9g",
    authDomain: "info1601-grproject.firebaseapp.com",
    projectId: "info1601-grproject",
    storageBucket: "info1601-grproject.appspot.com",
    messagingSenderId: "48425542087",
    appId: "1:48425542087:web:6e6dac09cb7da63da4b9e2",
    measurementId: "G-T83E3K6DDE"
});

const db = getFirestore(firebaseApp);

db.collection('users').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        getUser(doc);
    })
})

async function getUser (user) {

    const url = `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${user.data().uname}&url_embed_safe=true`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '475e929322msh44243506fa85e79p16c5d0jsn13a8e50d94ab',
		'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
} catch (error) {
	console.error(error);
};

    createCard (result, user.data().desc);
};



function createCard (result, desc) {

    let html = '';
    let result = document.querySelector('#result');

    html += `
    <div class="card">
                <div class="card-image">
                    <img src="${result.profile_pic_url}" alt="${result.full_name} Image">  
                </div>
                <div class="card-content">
                    <p>${user.full_name}</p>
                    <button type="button" onclick=>Contact</button> 
                    <p> ${desc} </p>

                    `;
                    result.innerHTML = html;
}
