import { Map } from './ui/Map';
import { Coordinates } from './utility/Coordinates';

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    document.querySelector('header h1').textContent = address;
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coordinates = new Coordinates(+queryParams.get('lat'), +queryParams.get('lng'));
const address = queryParams.get('address');

new LoadedPlace(coordinates, address);
