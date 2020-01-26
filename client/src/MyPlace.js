import { Map } from './ui/Map';
import { GET_URL } from './utility/urls';
import { Coordinates } from './utility/Coordinates';

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    document.querySelector('header h1').textContent = address;
  }
}

const url = new URL(location.href);
const locationId = url.searchParams.get('locationId');
// const queryParams = url.searchParams;
// const coordinates = new Coordinates(+queryParams.get('lat'), +queryParams.get('lng'));
// const address = queryParams.get('address');

fetch(GET_URL + locationId)
  .then(response => {
    if (response.status === 404) {
      throw new Error('Location not found!');
    }
    return response.json();
  })
  .then(data => {
    new LoadedPlace(data.coordinates, data.address);
  })
  .catch(err => alert(err.message));
