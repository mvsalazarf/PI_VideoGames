import { CREATE_VIDEOGAMES } from '.';
import axios from 'axios';

export default function createVg(payload) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post('http://localhost:3001/videogames', payload);
      dispatch({
        type: CREATE_VIDEOGAMES,
        payload: data,
      });
      return data;
    } catch (error) {
      console.error('Error al crear el videojuego:', error);
    }
  };
}