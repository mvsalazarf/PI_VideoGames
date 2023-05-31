const { Router } = require('express');
const genreRoute = Router();
const {getGenresHandler} = require('../handlers/genresHandler')

genreRoute.get('/', getGenresHandler)


module.exports = genreRoute;