document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('year', document.getElementById('year').value);
    formData.append('genre', document.getElementById('genre').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('director', document.getElementById('director').value);
    formData.append('actors', document.getElementById('actors').value);
    formData.append('image', document.getElementById('image').files[0]);

    const imageFile = formData.get('image');
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = function () {
        const imageBase64 = reader.result.split(',')[1];
        
        const movieData = {
            title: formData.get('title'),
            year: parseInt(formData.get('year')),
            genre: formData.get('genre'),
            description: formData.get('description'),
            director: formData.get('director'),
            actors: formData.get('actors'),
            image: imageBase64
        };

        fetch('https://imdb-copy.azurewebsites.net/api/createMovie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieData)
        })
        .then(response => {
            if (response.ok) {
                alert('Film information and image uploaded successfully.');
            } else {
                return response.text().then(errorMessage => {
                    throw new Error(errorMessage);
                });
            }
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
    };
});


async function getThumbnail() {
    const title = document.getElementById('titleSearch').value;
    const response = await fetch(`https://imdb-copy.azurewebsites.net/api/getThumbnailFromTitle?title=${title}`);

    if (response.ok) {
        const data = await response.json();
        const imageUrl = data.imageUrl;
        document.getElementById('thumbnailContainer').innerHTML = `<img src="${imageUrl}" alt="Thumbnail">`;
    } else {
        const errorMessage = await response.text();
        document.getElementById('thumbnailContainer').innerHTML = `<h1>${errorMessage}</h1>`;
    }
}
