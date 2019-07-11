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
            console.log(data.title);
            res.json(data);
            /*
            res.render("movie-details", {
                title : data.title
            });
            */
        })
});

const requestMovie = (id) => {
    return  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${dotenv.parsed.API_KEY}`)
                .then((res) => {
                    const data = res.data;
                    return data;
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
