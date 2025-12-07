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
    <div className="max-w-[400px] mx-auto mt-4 p-6 rounded-2xl shadow-md">
      <div className="text-center mb-1">
        <h3 className="text-lg font-semibold mb-1">Sää - {city}</h3>
      </div>

      <div className="flex items-center justify-center gap-4 mb-2">
        <img
          src={iconUrl}
          alt={weatherData.description}
          className="w-20 h-20"
        />
      </div>

      <div>
        <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
        <p className="text-gray-700">Tuntuu kuin {weatherData.feelsLike}°C</p>
      </div>

      <p className="text-center text-gray-700 capitalize mb-2">
        {weatherData.description}
      </p>

      <div>
        <span className="flex-1 text-gray-700">Kosteus:</span>
        <span className="flex-1 text-gray-800"> {weatherData.humidity}%</span>
      </div>

      <div>
        <span className="text-gray-700">Tuuli: </span>
        <span className="flex-1 text-gray-800">
          {weatherData.windSpeed} m/s
        </span>
      </div>
      <div>
        <span className="text-gray-700">Näkyvyys: </span>
        <span className="flex-1 text-gray-800">
          {weatherData.visibility} km
        </span>
      </div>

      <p className="text-center text-md text-gray-600 mt-4">
        Päivitetty: {lastUpdated}
      </p>
    </div>
  );
}

export default WeatherWidget;
