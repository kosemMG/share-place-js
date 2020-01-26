import { Coordinates } from './utility/Coordinates';
import { Modal } from './ui/Modal';
import { Map } from './ui/Map';
import { getCoordinates, getAddress } from './utility/Location';
import { POST_URL } from './utility/urls';

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserButton = document.getElementById('locate-btn');
    this.shareButton = document.getElementById('share-btn');
    this.sharedLinkInput = document.getElementById('share-link');

    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    locateUserButton.addEventListener('click', this.locateUserHandler.bind(this));
    this.shareButton.addEventListener('click', this.sharePlaceHandler.bind(this));
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    if (!address || address.trim().length === 0) {
      alert('Invalid address. Please try again.');
      return;
    }
    const modal = new Modal('loading-modal-content');
    modal.show();
    try {
      const coordinates = await getCoordinates(address);
      this.renderPlace(coordinates, address);
    } catch (e) {
      alert(e.message);
    }
    modal.hide();
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert('Location feature is not available because your browser is outdated. Use Chrome instead!');
      return;
    }
    const modal = new Modal('loading-modal-content');
    modal.show();
    navigator.geolocation.getCurrentPosition(async success => {
      modal.hide();
      const coordinates = new Coordinates(success.coords.latitude, success.coords.longitude);
      const address = await getAddress(coordinates);
      this.renderPlace(coordinates, address);
    }, error => {
      modal.hide();
      alert('Could not locate. Please enter your address manually.');
    });
  }

  renderPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    fetch(POST_URL, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        address: address,
        lat: coordinates.lat,
        lng: coordinates.lng
      })
    }).then(response => response.json())
      .then(data => {
        this.shareButton.disabled = false;
        this.sharedLinkInput.value = `${location.origin}/my-place?locationId=${data.locationId}`;
      });
  }

  sharePlaceHandler() {
    if (!navigator.clipboard) {
      this.sharedLinkInput.select();
      return;
    }
    navigator.clipboard.writeText(this.sharedLinkInput.value)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.log(err));
  }
}

new PlaceFinder();
