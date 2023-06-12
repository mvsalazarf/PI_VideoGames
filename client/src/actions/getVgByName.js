import axios from 'axios';
import { GET_VIDEOGAMES } from '.';

export default function getVgByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: json.data
      })
    } catch (error) {
      console.log(`Error in aaction GET_VG_BY_NAME: ${error.message}`)
    }
  }
}