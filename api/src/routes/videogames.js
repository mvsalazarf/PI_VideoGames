const { Router } = require('express');
const gamesRouter = Router();
const { getVideogamesHandler,
        getGameDetailHandler,
        createVideogammeHandler
      } = require('../handlers/videogamesHandlers')


gamesRouter.get('/', getVideogamesHandler)

gamesRouter.get('/:idVideogames', getGameDetailHandler)

gamesRouter.post('/', createVideogammeHandler)

module.exports = gamesRouter;
  