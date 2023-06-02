const {getGenresFromDb, getGenresFromApi} = require('../controllers/genresController')

const getGenresHandler = async (req, res) => {

  try {
    // Buscar los géneros en la base de datos
    const genresDb = await getGenresFromDb();
   
    if (genresDb.length > 0) {
      // Si se encontraron géneros en la base de datos, retornarlos
      res.status(200).json(genresDb);
    } else {
      // Si no se encontraron géneros en la base de datos, obtenerlos de la API
      const genresApi = await getGenresFromApi();
      res.status(200).json(genresApi);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getGenresHandler
};