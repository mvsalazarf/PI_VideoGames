const axios = require('axios');
const { getGamesByName, getAllGames, getVideogameById } = require('../controllers/videoGamesControllers');
require('dotenv').config()
const { API_KEY } = process.env;


const getVideogamesHandler = async (req, res) => {

  const { name } = req.query;

  try {
    //making sure there's a name by query
    const gameResult = name ?
      await getGamesByName(name) :
      await getAllGames();
    if (gameResult.length === 0) {
      res.status(404).json({message: 'No videogames found'})
    } else {
      res.status(200).json(gameResult);
    }
  } catch (error) {
    res.status(500).json({ error: `The following error occurred: ${error.message} while getting the videogames` });
  }

}

const getGameDetailHandler = async (req, res,) => {
// Tiene que incluir los datos del género del videojuego al que está asociado.
  const { id } = req.params;
  console.log(id)
 
   const source = isNaN(id) ? 'db' : 'api';
  try {
    const results = await getVideogameById(id, source);
    console.log(results)
    res.status(200).json(results)
  } catch (error) {
    res.status(404).json('Id not found')
  }
  
}

const createVideogammeHandler = async (req, res) => {
//   Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).
  
  
  
  
}

module.exports = {
  getVideogamesHandler,
  getGameDetailHandler,
  createVideogammeHandler,
}