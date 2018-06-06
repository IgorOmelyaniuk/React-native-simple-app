import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = place => {
  return {
    type: ADD_PLACE,
    payload: place
  }
}

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    payload: key
  }
}
