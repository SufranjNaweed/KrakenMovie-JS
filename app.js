////////////////
//  SETTINGS
////////////////

const express =  require('express');
const app = express();
const dotenv = require('dotenv').config();
const axios =  require('axios');

const port = 9000;

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

app.get('/movie-list', (req, res) =>{
    res.send("Movie List.");
});

app.get('/movie-details/:id', (req, res) => {
    const id =  req.params.id;
    requestMovie(id)
        .then((data) =>{
            console.log(data);
            //res.json(data);
            res.render("movie-details", {
                data : data
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

const dataMovie = (data, id) => {
    /*
        const trailer = trailerFromYoutube(id)
        .then((res) => {
        console.log(finalData.trailer);
            return finalData;
        })
        .catch((err) => {
            console.error(err);
        });

    */
    const finalData = {
        adult               : data.adult, 
        title               : data.title,
        homepage            : data.homepage,
        budget              : data.budget,
        genres              : data.genres,
        poster              : "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + data.poster_path,
        backgroundPoster    : "https://image.tmdb.org/t/p/w1400_and_h450_face"+ data.poster_path,
        overview            : data.overview,
        productionCompanies : data.production_companies,
       
    };

    finalData.release_date = getDateYear(data.release_date);

    return finalData;
}

const getDateYear = (date) => {
    let newDate = new Date(date);
    var result = newDate.getFullYear();

    return result;
}

const trailerFromYoutube = (id) => {
    const query = `http://api.themoviedb.org/3/movie/${id}/videos?api_key=${dotenv.parsed.API_KEY}`;
    return axios.get(query)
        .then((res) => {
            const video = `https://www.youtube-nocookie.com/embed/${res.data.results[0].key}]?controls=0`;
            return video;
        })
        .catch((err) => {
            console.error(err);
        });
}

//////////////
/// POST
/////////////


//////////////////////
//  LISTEN - PORT
//////////////////////
app.listen(port, () => {
    console.log(`Exemple  app listening on port ${port}.`);
});
