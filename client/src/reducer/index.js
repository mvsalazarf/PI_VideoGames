import { GET_VG_BY_NAME, GET_VIDEOGAMES, GET_VG_BY_ID, VG_ORIGIN, GENRE_FILTER, FILTERED_GAMES, CREATE_VIDEOGAMES, GET_GENRES } from "../actions";


const initialState = {
  videogames: [],
  videogameDetails:{},
  genres:[],
  createVg: [],
  filteredVg: [],
  
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        filteredVg: action.payload
      }
    case GET_VG_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
       
      }
    case GET_GENRES:
        return{       
          ...state,   
          genres: action.payload
      }
    case GET_VG_BY_ID:
      return {
        ...state, 
        videogameDetails: action.payload,
      }
    case GENRE_FILTER:
      const allVgames = state.filteredVg
      const genreFilter = allVgames.filter(g => g.genres.includes(action.payload))
      if (!genreFilter.length) {
        alert(`No videogames found based in ${action.payload} genre`)
      } 
      return {
        ...state,
          videogames: genreFilter
        }   
    case CREATE_VIDEOGAMES:
      return {
        ...state,
        createVg: action.payload
      }
    case VG_ORIGIN:
      const originVg = state.filteredVg;
      const originFilter = action.payload === 'DB' ? originVg.filter(el => el.created) : originVg.filter(el => !el.created);
      return {
        ...state,
        videogames: action.payload === 'All' ? state.filteredVg : originFilter
      }
    case FILTERED_GAMES:
      if (action.payload === 'rating') {
        let sortedArr = state.videogames.sort(function (a, b) {
          if (a.rating > b.rating) {
            return -1;
          }
          if (b.rating > a.rating) {
            return 1;
          }
          return 0
        })
        return {
          ...state, 
          videogames: sortedArr
        }
      } else {
        let sortedArr  = action.payload === 'asc' ?
          state.videogames.sort(function (a,b) {
              if(a.name > b.name) {
              return 1;
              }
              if(b.name > a.name) {
              return -1;
              }
              return 0;
              }) :
              state.videogames.sort(function (a,b) {
              if(a.name > b.name) {
              return -1;
              }
              if(b.name > a.name) {
              return 1;
              }
              return 0;
              })
              return {
              ...state,
              videogames: sortedArr
              }    
      }
    default: return {...state}
  }
}

export default rootReducer;