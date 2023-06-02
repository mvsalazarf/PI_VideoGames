const { Genre} = require('../db');
const axios = require('axios');
require('dotenv').config()
const { API_KEY } = process.env;


const getGenresFromDb = async () => {
  // Buscar todos los géneros en la base de datos
  const genres = await Genre.findAll();
  return genres;
 }


const { v4: uuidv4 } = require('uuid');

const getGenresFromApi = async () => {
  const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  const apiGenres = response.data.results;

  // Guardar los géneros en la base de datos iterando en cada género
  for (const genre of apiGenres) {
    await Genre.create({
      id: uuidv4(), // Generar un UUID válido como ID
      name: genre.name,
      created: false,
    });
  }

  // Retornar los géneros obtenidos de la API
  return apiGenres;
};

  
module.exports = {
  getGenresFromDb,
  getGenresFromApi
}