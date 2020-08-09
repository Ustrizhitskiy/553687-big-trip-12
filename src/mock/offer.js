const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const allOffersAndTypes = new Map();
allOffersAndTypes.set(`flightOffers`, [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`]);
allOffersAndTypes.set(`trainOffers`, [`Travel by train`]);
allOffersAndTypes.set(`restaurantOffers`, [`tableOrder`, `windowSeat`]);
allOffersAndTypes.set(`taxiOffers`, [`tips`]);
allOffersAndTypes.set(`otherOffers`, []);

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
    cost: generateOfferCost(),
  }
};
