/* const db = getFirestore(firebaseApp); */

/* import { getDocs, collection } from "firebase/firestore"; 

const querySnapshot = await getDocs(collection(db, 'users'));

querySnapshot.forEach((doc) => {
    getUser(doc.data().uname);
}) */

async function loaduser () {

    let response = await fetch ('/users.json');
    let result = await response.text();
    for (let user of result) {
        getUser(user);
    }
}

async function getUser (user) {

    const url = `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=mrbeast`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '475e929322msh44243506fa85e79p16c5d0jsn13a8e50d94ab',
		'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}

    createCard (result, user.desc);
};



function createCard (data, desc ) {

    let html = ' ';
    let goal = document.querySelector('#result');

    html += `
    <div class="card">
                <div class="card-image">
                    <img src="${data.profile_pic_url}" alt="${data.full_name} Image">  
                </div>
                <div class="card-content">
                    <p>${data.full_name}</p>
                    <button type="button" onclick=>Contact</button> 
                    <p> ${desc} </p>

                    `;
                    goal.innerHTML = html;
}
loaduser();



