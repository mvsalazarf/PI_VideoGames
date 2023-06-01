const axios = require('axios');
const { getGamesByName, getAllGames } = require('../controllers/videoGamesControllers');
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

const getGameDetailHandler = async (req, res) => {
  res.status(200).send('All Good')
//   Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.
  
  
}

const createVideogammeHandler = async (req, res) => {
//   Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).
  
  
  
  //en estas funciones van los try catch
}

module.exports = {
  getVideogamesHandler,
  getGameDetailHandler,
  createVideogammeHandler,
}