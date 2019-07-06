////////////////
//  SETTINGS
////////////////

const express =  require('express');
const app = express();
const dotenv = require('dotenv').config();

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
    res.send(`Movie - ID : ${id}.`);
});

//////////////
/// POST
/////////////


//////////////////////
//  LISTEN - PORT
//////////////////////
app.listen(port, () => {
    console.log(`Exemple  app listening on port ${port}.`);
});
