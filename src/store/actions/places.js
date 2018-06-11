import { REMOVE_PLACE, SET_PLACES } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index'

export const addPlace = place => dispatch => {
  dispatch(uiStartLoading())
  fetch('https://us-central1-awesome-places-88b76.cloudfunctions.net/storeImage', {
    method: 'POST',
    body: JSON.stringify({
      image: place.image.base64
    })
  })
  .catch(err => {
    console.log(err)
    dispatch(uiStopLoading())
  })  
  .then(res => res.json())
  .then(data => {
    const placeData = {
      name: place.placeName,
      location: place.location,
      image: data.imageUrl
    }
    return fetch('https://awesome-places-88b76.firebaseio.com/places.json', {
      method: 'POST',
      body: JSON.stringify(placeData)
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    dispatch(uiStopLoading())
  })
  .catch(err => {
    console.log(err)
    dispatch(uiStopLoading())
  });
}

export const deletePlace = key => dispatch => {
  dispatch(removePlace(key))
  
  fetch('https://awesome-places-88b76.firebaseio.com/places/' + key + '.json', {
    method: 'DELETE',
  })
  .catch(err => {
    console.log(err)
    dispatch(uiStopLoading())
  })  
  .then(res => res.json())
  .then(data => console.log(data))
}

const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    payload: key
  }
}

export const getPlaces = () => dispatch => {
  fetch('https://awesome-places-88b76.firebaseio.com/places.json')
  .then(resp => resp.json())
  .then(data => {
    const places = [];
    for (let key in data) {
      places.push({
        ...data[key],
        image: {
          uri: data[key].image
        },
        key: key
      })
    }
    dispatch(setPlaces(places))
  })
  .catch(err => console.log(err))
}

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    payload: places
  }
}
