export const getOnlyTimeFromDate = (date) => {
  try {
    return date.toLocaleTimeString(`en-GB`, {hour: `numeric`, minute: `2-digit`});
  } catch (e) {
    throw new Error(`Input parameters are not Date object.`);
  }
};

export const getFormattedDateString = (date) => {
  try {
    const formattedDate = date
      .toLocaleDateString(`en-GB`, {day: `2-digit`, month: `2-digit`, year: `2-digit`, hour: `2-digit`, minute: `2-digit`})
      .split(`,`)
      .join(``);

    return `${formattedDate}`;
  } catch (e) {
    throw new Error(`Input parameters are not Date object.`);
  }
};

export const getTimeFromStartToEnd = (startDate, endDate) => {
  try {
    const timeInMilliseconds = endDate.getTime() - startDate.getTime();
    const timeInMinutes = Math.trunc(timeInMilliseconds / 1000 / 60);
    const days = Math.trunc(timeInMinutes / 1440);
    const hours = Math.trunc((timeInMinutes - days * 1440) / 60);
    const minutes = timeInMinutes - days * 1440 - hours * 60;

    return `${days > 0 ? days + `D` : ``} ${hours > 0 ? hours + `H` : ``} ${minutes > 0 ? minutes + `M` : ``}`.trim();
  } catch (e) {
    throw new Error(`Input parameters are not Date object.`);
  }
};
