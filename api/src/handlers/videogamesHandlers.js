//const axios = require('axios');
const { getGamesByName, getAllGames } = require('../controllers/videoGamesControllers');
require('dotenv').config()
const { API_KEY } = process.env;


const getVideogamesHandler = async (req, res) => {
  //***Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información

  //***por query:
// Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.
  const { name } = req.query;
  try {
    const gameResult = name ?
      await getGamesByName(name) :
      await getAllGames();
    res.status(200).json(gameResult)
  } catch (error) {
    res.status(404).json({error: error.message})
  }



// try {
  
//   console.log (API_KEY);
//     var apiresult = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
//     apiresult = apiresult.data.results;
//     res.status(200).json(apiresult)
// } catch (error) {
//   res.json({error: error.message})
// }
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