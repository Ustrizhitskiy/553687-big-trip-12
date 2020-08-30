import {getRandomInteger} from "../util/common";

const allOffersAndTypes = new Map();
allOffersAndTypes.set(`Flight`, [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`]);
allOffersAndTypes.set(`Drive`, []);
allOffersAndTypes.set(`Transport`, [`Add luggage`]);
allOffersAndTypes.set(`Ship`, [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`]);
allOffersAndTypes.set(`Train`, [`Travel by train`]);
allOffersAndTypes.set(`Bus`, [`Add luggage`, `Choose seats`]);
allOffersAndTypes.set(`Taxi`, [`Add luggage`]);
allOffersAndTypes.set(`Restaurant`, [`Table order`, `Seat near the window`, `Tips`]);
allOffersAndTypes.set(`Sightseeing`, []);
allOffersAndTypes.set(`Check-in`, []);

export const getOffersByType = (eventType) => {
  const offersByType = allOffersAndTypes.get(eventType);
  if (offersByType.length === 0) {
    return [];
  }

  let offersList = [];

  for (let i = 0; i < offersByType.length; i++) {
    const offer = {
      type: eventType,
      description: offersByType[i],
      cost: getRandomInteger(1, 1000)
    };

    offersList.push(offer);
  }

  return offersList;
};
