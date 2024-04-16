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

async function uploadImage() {
    const url = 'https://upload-image2.p.rapidapi.com/upload';
    const data = new FormData();
    
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    data.append('filetoupload', file);
    
    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': 'fa0b15caf9msh00aa48e116e37ecp1d3845jsn8b3b4d19c837',
            'X-RapidAPI-Host': 'upload-image2.p.rapidapi.com'
        },
        body: data
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

