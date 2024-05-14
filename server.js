const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); 

app.get('/tmdb/image/:path(*)', (req, res) => {
    const url = `https://image.tmdb.org/t/p/${req.params.path}`;
    res.redirect(url);
});

app.get('/tmdb/api/*', (req, res) => {
    const url = `https://api.themoviedb.org/3${req.originalUrl.replace('/tmdb/api', '')}`;
    res.redirect(url);
});

app.listen(3001, () => {
    console.log('port 3001');
});
