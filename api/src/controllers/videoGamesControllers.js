const { Videogame, Genre } = require('../db');
const axios = require('axios')
const {Op} = require('sequelize')
require('dotenv').config()
const { API_KEY } = process.env;

function transformGames(games) {
  //organizo la data similar al modelo de la db
  return games.map((game) => {
    return {
      id: game.id,
      image: game.background_image,
      name: game.name,
      description: game.description,
      genres: game.genres.map((genre) => genre.name),
      platforms: game.platforms.map((p) => p.platform.name),
      rating: game.rating,
      released: game.released,
      created: false
    };
  });
}

const cleanApiArray = async (name) => {
  name = name.split(' ').join('-').toLowerCase();
  //traigo los juegos de la api ordenandolos en 100 por página
  const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${ API_KEY }&page_size=100`);
  //ordeno la info de la api para que tenga las mismas características que la DB
  const apigames = response.data.results;
  const transformedGames = transformGames(apigames);
  return transformedGames;
};

const cleanApiArray2 = async () => {
  
  //traigo los juegos de la api ordenandolos en 100 por página
  const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`);
  //ordeno la info de la api para que tenga las mismas características que la DB

  const apigames = response.data.results;
  const transformedGames = transformGames(apigames);
  return transformedGames;
};

const dataBasebyName = async (name) => {
  return await Videogame.findAll({
    include: [Genre],
    //incluyendo también la información del modelo relacionado Genre 
    where: {
      //lo busca por el nombre pudiendo terminar en algo inexacto
      name: { [Op.like]: `%{name}%` }
    }
  });
};

const dataBase = async () => {
  return await Videogame.findAll({
    include: [Genre],
    //incluyendo también la información del modelo relacionado Genre 
  });
};

const getGamesByName = async (name) => {
  //en esta función junto toda la información de la API más la base de datos
  const apiData = await cleanApiArray(name);
  const dbData = await dataBasebyName(name);
  const totalResult = [...dbData, ...apiData];
  const first15Elements = totalResult.slice(0, 15);
  return first15Elements;
}

const getAllGames = async () => {
  //uno los resultados de la API con los de la base de datos
  const apiData = await cleanApiArray2();
 

  const dbData = await dataBase();
  const totalResult = [...dbData, ...apiData];
  return totalResult;
}

const getVideogameById = async (id, source) => {
//verifico si el id pertenece a la api o a la base de datoss
  if (source === 'api') {
    const {data} = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
   
    const gameId = {
       id: data.id,
      image: data.background_image,
      name: data.name,
      description: data.description,
      genres: data.genres.map((genre) => genre.name),
      platforms: data.platforms.map((p) => p.platform.name),
      rating: data.rating,
      released: data.released
    }
    return gameId;
    } else {
      return await Videogame.findByPk(id, {
      include: [Genre],
     });
    }
  
};



const createVideogame = async (name, image, description, released, rating, platform, genres) => {
//aqui va la lógica de la función que interactua con el modelo de la DB
platform = platform.join(', ');
 
  let newGame = await Videogame.create({
    name: name,
    image: image,
    description: description,
    released: released,
    rating: rating || 1,
    platform: platform,
    created: true,
  })
  
// Busca los géneros en la base de datos
  let genreDb = await Genre.findAll({
        where: {name : genres}
    })
// Asocia los géneros al videojuego creado
  newGame.addGenre(genreDb);
  
};



module.exports = {
  createVideogame,
  cleanApiArray,
  getGamesByName,
  getAllGames,
  getVideogameById
}