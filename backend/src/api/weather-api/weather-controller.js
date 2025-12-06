import 'dotenv/config';

// Restaurants location (later need to change with chosen name, address and lat/lon)
const RESTAURANT_LOCATION = {
  name: 'Mexican Restaurant',
  address: 'Myllypurontie 1, 00920 Helsinki',
  city: 'Helsinki',
  lat: 60.2094,
  lon: 25.0778,
};

/*
 * Get current weather for restaurant location
 */

const getWeatherInfo = async (req, res, next) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      throw new Error('OpenWeather API key not configured');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${RESTAURANT_LOCATION.lat}&lon=${RESTAURANT_LOCATION.lon}&appid=${apiKey}&units=metric&lang=fi`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    //Format the response
    const weatherInfo = {
      restaurantName: RESTAURANT_LOCATION.name,
      address: RESTAURANT_LOCATION.address,
      city: RESTAURANT_LOCATION.city,
      weather: {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 10) / 10,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // Convert to km
        cloudiness: data.clouds.all,
      },
      lastUpdatedISO: new Date().toISOString(),
      timeZone: 'Europe/Helsinki',
      lastUpdated: new Date().toLocaleString('fi-FI'),
    };
    res.json(weatherInfo);
  } catch (error) {
    console.error('Error fetching weather info: ', error);
    const err = new Error('Failed to fetch weather information');
    err.status = 500;
    next(err);
  }
};

export {getWeatherInfo};
