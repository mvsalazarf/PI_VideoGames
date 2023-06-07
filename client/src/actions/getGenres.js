import { GET_GENRES } from ".";
import axios from 'axios';

export default function getgenres() {
    return async function (dispatch){
        var {data} = await axios.get('http://localhost:3001/genres'); 
        return dispatch({ 
            type: GET_GENRES, 
            payload: data
        })                                                                                                 
    }
}