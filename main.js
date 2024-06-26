const db = getFirestore(firebaseApp);

import { getDocs, collection } from "firebase/firestore"; 

const querySnapshot = await getDocs(collection(db, 'users'));

querySnapshot.forEach((doc) => {
    getUser(doc.data().uname);
})

async function getUser (user) {

    const url = `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${user}&url_embed_safe=true`;
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

    createCard (result);
};



function createCard (result) {

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
                    <p> ${result.biography} </p>

                    `;
                    result.innerHTML = html;
}



