export default class DestinationModel {
  constructor() {
    this._destinations = [];
  }

  getDestinations() {
    return this._destinations;
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }
}
