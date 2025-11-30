import {
  listAllLunchSpecials,
  findLunchSpecialByDay,
  findTodaysLunchSpecial,
} from './lunch-special-model.js';

const getAllLunchSpecials = async (req, res) => {
  try {
    const specials = await listAllLunchSpecials();
    res.json(specials);
  } catch (error) {
    console.error('Error fetching lunch specials: ', error);
    res.status(500).json({message: 'Error fetching lunch specials'});
  }
};

const getLunchSpecialByDay = async (req, res) => {
  try {
    const day = req.params.day.toLowerCase();
    const special = await findLunchSpecialByDay(day);

    if (special) {
      res.status(200).json(special);
    } else {
      res.status(404).json({message: `No lunch special found for ${day}`});
    }
  } catch (error) {
    console.error('Error fetching lunch special by day: ', error);
    res.status(404).json({message: 'Error fetching lunch special'});
  }
};

const getTodaysLunchSpecial = async (req, res) => {
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
        res.status(404).json({message: 'No lunch specials on weekends'});
      } else {
        res.status(404).json({message: 'No lunch special available today'});
      }
    }
  } catch (error) {
    console.error('Error fetching lunch special by day; ', error);
    res.status(500).json({message: 'Error fetching lunch special'});
  }
};

export {getAllLunchSpecials, getLunchSpecialByDay, getTodaysLunchSpecial};
