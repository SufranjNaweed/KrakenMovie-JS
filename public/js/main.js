document.addEventListener("DOMContentLoaded", function() {
    ////////////////////
    //   Functions
    ///////////////////
    
    /// Search
    function search(){
        const query = `${API_URL}${API_KEY}&query=${inputSearch.value}`;
        axios.get(query)
        .then((res)=>{
            displayResults(res.data.results);
        })
        .catch((error)=>{console.log(error)})
    }
    
    /// Generate Template 
    function templateResult(data){
        const overview = data.overview.substr(0, 350) + '...';
        const template = `    
        <a href="/movie-details/${data.id}">
            <div class="card">
                <div class="left">
                    <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.poster_path}" alt="">
                </div>
                <div class ="right">
                    <p>${data.title}</p>
                    <span>Year : ${data.release_date} </span>
                    <p>${overview}</p>
                </div>
            </div>
        </a>
        `;

        return template;
    }

    /// Display Results
    function displayResults(results){
        modalResults.innerHTML = '';
        for(let result of results){
            let movieDiv =  document.createElement('div');
            movieDiv.innerHTML = templateResult(result);
            modalResults.appendChild(movieDiv);
        }
        
        // hide modal & overlay
        modalResults.style.display = "block";
        overlayResults.style.display = "block";
        inputSearch.value = "";
    }


    // Data
    var data    =  document.querySelector("#data");
    
    // inputs & modal
    var btnSearch       = document.querySelector('#searchBtn');
    var inputContainer  = document.querySelector('.search-form');
    var inputSearch     = document.querySelector('#search');
    var modalResults    = document.querySelector('#modalResults');
    var overlayResults  = document.querySelector('.overlay-results');
    


    // Events
    btnSearch.addEventListener('click', function(e){
        e.preventDefault();
        inputContainer.classList.toggle('active');
        if (inputSearch.value != ""){
            search();
        }
    });


    overlayResults.addEventListener('click', function(e){
        e.preventDefault();
        inputContainer.classList.toggle('active');
        this.style.display = "none";
        modalResults.style.display = "none";
    });

    inputContainer.addEventListener('focus', function() {
        inputContainer.classList.add('focus');
    });

    inputContainer.addEventListener('blur', function() {
        inputSearch.value.length != 0 ? inputContainer.classList.add('focus') : inputContainer.classList.remove('focus');
    });



});


function showTrailer(){
    modalTrailer.style.display = "block";
}
function hideTrailer(){
    modalTrailer.style.display = "none";  
    
    trailerScr          = trailer.src;
    trailer.src          = trailerScr ;
}
var playTrailer     = document.querySelector("#playTrailer");
var modalTrailer    = document.querySelector('#modal-trailer');
var overlayTrailer  = document.querySelector('.overlayTrailer');
var trailer         = document.querySelector('#trailer');


playTrailer.addEventListener('click', showTrailer);
overlayTrailer.addEventListener('click', hideTrailer)