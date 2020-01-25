export class Map {
  constructor(coordinates, mapContainerId = 'map') {
    this.coordinates = coordinates;
    this.mapContainerId = mapContainerId;
    this.render(this.coordinates);
  }

  render(coordinates) {
    /** @var google */
    if (!google) {
      alert('Could not load maps library. Try again later.');
      return;
    }

    /** @type {{maps: any, maps.Marker: any}} */
    const map = new google.maps.Map(document.getElementById(this.mapContainerId), {
      center: coordinates,
      zoom: 16
    });

    new google.maps.Marker({
                             map: map,
                             position: coordinates
                           });
  }
}
