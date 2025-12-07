import {useWeather} from '../hooks/apiHook.js';

function WeatherWidget() {
  const {weather, loading, error} = useWeather();

  if (loading) {
    return (
      <div>
        <p>Ladataan säätietoja...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  const {city, weather: weatherData, lastUpdated} = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

  return (
    <div className="max-w-[400px] max-h-[300px] mx-auto mt-4 p-6 rounded-2xl shadow-md">
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold mb-3">Sää - {city}</h3>
      </div>

      <div className="flex items-center justify-center gap-4 mb-2">
        <img
          src={iconUrl}
          alt={weatherData.description}
          className="w-20 h-20"
        />
      </div>

      <div className="flex flex-col">
        <p>{weatherData.temperature}°C</p>
        <p>Tuntuu kuin {weatherData.feelsLike}°C</p>
      </div>
    </div>
  );
}

export default WeatherWidget;
