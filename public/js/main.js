document.addEventListener("DOMContentLoaded", function() {

    // Data
    const data    =  document.querySelector("#data");
    const API_KEY =  data.dataset.apikey;
    const API_URL =  data.dataset.apiurl;

    console.log("key : " + API_KEY, "Url : " + API_URL);

    // inputs & modal
    const btnSearch     = document.querySelector('#searchBtn');
    let inputSearch     = document.querySelector('#search');
    let modalResults    = document.querySelector('#modalResults');

    // Events
    btnSearch.addEventListener('click', search);

    // Functions
    function search(){
        const query = `${API_URL}${API_KEY}&query=${inputSearch.value}`;
        axios.get(query)
        .then((res)=>{
            console.log(res)
            displayResults(res.data.results);
        })
        .catch((error)=>{console.log(error)})
    }
    
    function displayResults(results){
        modalResults.innerHTML = '';
        for(let result of results){
            let movieDiv =  document.createElement('div');
            movieDiv.innerHTML = result.title;
            modalResults.appendChild(movieDiv);
        }
    }
});