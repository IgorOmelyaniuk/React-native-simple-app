import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';


const initialState = {
  places: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PLACE: {
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          name: action.payload,
          image: {
            uri: 'http://kiezinberlin.com/wp-content/uploads/2017/03/berlin-not-germany-4.png'
          }
        })
      }
    }
    case DELETE_PLACE: {
      return {
        ...state,
        places: state.places.filter((place) => place.key !== action.payload)
      }
    }
    default:
      return state;
  }
}

export default reducer;