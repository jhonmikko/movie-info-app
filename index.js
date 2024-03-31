// Get reference to the input field for movie name
let movieNameRef = document.getElementById("movie-name");

// Get reference to the search button
let searchBtn = document.getElementById("search-button");

// Get reference to the element where search results will be displayed
let result = document.getElementById("result");

// Function to fetch and display movie information
let getMovie = () => {
    // Get the value entered in the movie name input field
    let movieName = movieNameRef.value;

    // Constructing the URL for fetching movie data from OMDB API
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // Check if movie name is provided
    if(movieName.length <= 0){
        // Display a message if no movie name is provided
        result.innerHTML = `<h3 class="msg">Please enter a movie name.</h3>`;
    } else {
        // Fetch movie data from the OMDB API
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // Check if the response is successful
                if(data.Response == "True"){
                    // Display movie information if response is successful
                    result.innerHTML = `
                        <div class="info">
                            <img src="${data.Poster}" class="poster">
                            <div>
                                <div class="rating">
                                    <img src="star-icon.svg">
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div>
                            </div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p>
                    `;
                } else {
                    // Display error message if movie is not found
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch(() => {
                // Display error message if there's an issue with fetching data
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
} 

// Add click event listener to the search button
searchBtn.addEventListener("click", getMovie);

// Fetch movie information when the window is loaded
window.addEventListener("load", getMovie);
