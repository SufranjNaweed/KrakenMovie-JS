document.addEventListener("DOMContentLoaded", function() {
    ////////////////////
    //   Functions
    ///////////////////
    
    /// Search
    function search(){
        const query = `${API_URL}${API_KEY}&query=${inputSearch.value}?&language=fr-FR`;
        axios.get(query)
        .then((res)=>{
            console.log(res)
            displayResults(res.data.results);
        })
        .catch((error)=>{console.log(error)})
    }
    
    /// Generate Template 
    function templateResult(data){
        const overview = data.overview.substr(0, 350) + '...';
        const temlate = `    
        <a href="/movie-details/${data.id}">
            <div class="card">
                <div class="left">
                    <img src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.poster_path}" alt="">
                </div>
                <div class ="right">
                    <p>${data.title}</p>
                    <span>Année : ${data.release_date} </span>
                    <p>${overview}</p>
                </div>
            </div>
        </a>
        `;

        return temlate;
    }

    /// Display Results
    function displayResults(results){
        console.log(results);
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
    const data    =  document.querySelector("#data");
    console.log(API_KEY, API_URL);

    // inputs & modal
    const btnSearch     = document.querySelector('#searchBtn');
    let inputContainer  = document.querySelector('.search-form');
    let inputSearch     = document.querySelector('#search');
    let modalResults    = document.querySelector('#modalResults');
    const overlayResults = document.querySelector('.overlay-results');

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