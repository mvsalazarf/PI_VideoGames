import { GET_VG_BY_ID } from ".";
import axios from 'axios';

export default function getVgById(id) {
  return async function (dispatch) {
    try {
      const {data} = await axios.get(`http://localhost:3001/videogames/${id}`)
      if (data.genres[0].id) {
      const genreObject = data.genres.map((genre) => genre.name)
        data.genres = genreObject.join(', ')
      } else {
        data.genres = data.genres.join(', ')
    }
      return dispatch({
        type: GET_VG_BY_ID,
        payload: data
      })
    } catch (error) {
      console.log(`Error in action GET_VG_BY_ID: ${error.message}`)
    }
  }
}

