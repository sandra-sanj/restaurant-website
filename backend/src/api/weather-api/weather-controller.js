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

const getWeatherInfo = async () => {
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
};
