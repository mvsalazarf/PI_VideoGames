import { GET_VIDEOGAMES } from ".";
import axios from 'axios';

export default function getVideogames() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/videogames');
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: json.data
    })
  }
}