import {
  listAllLunchSpecials,
  findLunchSpecialByDay,
  findTodaysLunchSpecial,
} from './lunch-special-model.js';

const getAllLunchSpecials = async (req, res, next) => {
  try {
    const specials = await listAllLunchSpecials();
    res.json(specials);
  } catch (error) {
    console.error('Error fetching lunch specials: ', error);
    next(error);
  }
};

const getLunchSpecialByDay = async (req, res, next) => {
  try {
    const day = req.params.day.toLowerCase();
    const special = await findLunchSpecialByDay(day);

    if (special) {
      res.status(200).json(special);
    } else {
      const error = new Error(`No lunch special found for ${day}`);
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    console.error('Error fetching lunch special by day: ', error);
    next(error);
  }
};

const getTodaysLunchSpecial = async (req, res, next) => {
  try {
    const lunchSpecial = await findTodaysLunchSpecial();

    if (lunchSpecial) {
      res.status(200).json(lunchSpecial);
    } else {
      const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ];
      const today = days[new Date().getDay()];

      if (today === 'saturday' || today === 'sunday') {
        const error = new Error('No lunch special on weekends');
        error.status = 404;
        return next(error);
      } else {
        const error = new Error('No lunch special available today');
        error.status = 404;
        return next(error);
      }
    }
  } catch (error) {
    console.error('Error fetching lunch special by day; ', error);
    next(error);
  }
};

export {getAllLunchSpecials, getLunchSpecialByDay, getTodaysLunchSpecial};
