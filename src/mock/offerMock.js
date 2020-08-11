import {getRandomInteger} from "../util";

const allOffersAndTypes = new Map();
allOffersAndTypes.set(`flightOffers`, [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`]);
allOffersAndTypes.set(`trainOffers`, [`Travel by train`]);
allOffersAndTypes.set(`restaurantOffers`, [`Table order`, `Seat near the window`]);
allOffersAndTypes.set(`taxiOffers`, [`Tips`]);
allOffersAndTypes.set(`noOffers`, []);

const generateOffersType =() => {
  const allOfferTypes = Array.from(allOffersAndTypes.keys());
  const randomTypeIndex = getRandomInteger(0, 4);

  return allOfferTypes[randomTypeIndex]
};

const generateOfferDescription = (type) => {
  const allOffersByType = allOffersAndTypes.get(type);

  const randomIndex = getRandomInteger(0, allOffersByType.length - 1);

  return allOffersByType[randomIndex];
};

const generateOfferCost = () => {
  return getRandomInteger(1, 1000);
};

export const generateOffer = () => {
  const offersType = generateOffersType();

  return {
    type: offersType,
    description: generateOfferDescription(offersType) || ``,
    cost: offersType === `noOffers` ? `0` : generateOfferCost(),
  }
};
