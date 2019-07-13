////////////////
//  SETTINGS
////////////////

const express =  require('express');
const app = express();
const dotenv = require('dotenv').config();
const axios =  require('axios');

const PORT = process.env.PORT || 9000;
const HOST = '0.0.0.0';

///////////////////
//  Template
//////////////////

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

////////////
//  GET
///////////

app.get('/', (req, res) => {
    res.render("index", {api_key : dotenv.parsed.API_KEY, api_url : dotenv.parsed.API_URL});
});

app.get('/movie-details/:id', (req, res) => {
    const id =  req.params.id;
    let dataToSend;
    let response = res;

    const trailer = requestTrailer(id).then((res) => {
        trailerKey = res;
        requestMovie(id)
            .then((data) =>{
                dataToSend = data;
                dataToSend.trailer = trailerKey;
            })
            .then(() => {
                response.render("movie-details", {
                    data : dataToSend
                });
            });
    })
});

const requestMovie = (id) => {
    const query = `https://api.themoviedb.org/3/movie/${id}?api_key=${dotenv.parsed.API_KEY}`;

    return  axios.get(query)
                .then((res) => {
                    const data = dataMovie(res.data, id);
                    return data;
                })
                .catch((err) => {
                    console.error(err);
                });
}

const requestTrailer = (id) => {
    const queryTrailer = `http://api.themoviedb.org/3/movie/${id}/videos?api_key=${dotenv.parsed.API_KEY}`;
    const key = axios.get(queryTrailer).then((res) => {
        return(res.data.results[0].key);
    }).catch((err) => {
        console.error(err);
    });
    return key;
}

const dataMovie = (data, id) => {
    const finalData = {
        // String
        adult               : data.adult, 
        title               : data.title,
        overview            : data.overview,
        homepage            : data.homepage,
        
        // INT
        budget              : data.budget,
        revenue             : data.revenue,
        
        // URL Images
        poster              : "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + data.backdrop_path,
        backgroundPoster    : "https://image.tmdb.org/t/p/w1400_and_h450_face"+ data.poster_path,
        
        // Object
        genres              : data.genres,
        productionCompanies : data.production_companies,
        productionCountries : data.production_countries,
    };

    finalData.release_date = getDateYear(data.release_date);
    finalData.duration     = movieDuration(data.runtime)
    finalData.revenue      = NumberToCurrency(data.revenue);
    finalData.budget       = NumberToCurrency(data.budget);

    return finalData;
}


// Convert number to readable number
const NumberToCurrency = (nbr) => {
    nbr = nbr.toString();
    let resNbr =   nbr.split("");
    let resArray = [];

    if(resNbr.length <= 0){
        return 0;
    }
    else{
        let counter = 1;
        resNbr = resNbr.reverse();

        for(let i = 0; i < resNbr.length; i++){
            if (i % 3 == 0){
                resArray.push(" ");
            }
            resArray.push(resNbr[i]);
        }
        resArray = resArray.reverse();
        resArray = resArray.join("");
        resArray = resArray.trim();

        return resArray;
    }
}

// Convert Number to Hours
const movieDuration = (nbr) => {
    if (nbr == null){
        return "no info";
    }
    else{
        return (nbr / 60).toFixed(2);
    }
}

// Get Year from a Date
const getDateYear = (date) => {
    let newDate = new Date(date);
    var result = newDate.getFullYear();

    return result;
}

//////////////
/// POST
/////////////

//////////////////////
//  LISTEN - PORT
//////////////////////
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);