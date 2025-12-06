import {useWeather} from '../hooks/apiHook.js';

function WeatherWidget() {
  const {weather, loading, error} = useWeather();

  const {city, weather: weatherData, lastUpdated} = weather;

  return (
    <div>
      <h3>🌤️ Sää - {city}</h3>
    </div>
  );
}

export default WeatherWidget;
