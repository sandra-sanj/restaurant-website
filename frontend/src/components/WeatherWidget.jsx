import {useWeather} from '../hooks/apiHook.js';
import {Eye, Wind, Droplets, Cloud, Thermometer} from 'lucide-react';

function WeatherWidget() {
  const {weather, loading, error} = useWeather();

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">
        <p>Ladataan säätietoja...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-red-700">
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
    <div className="max-w-[380px] mx-auto mt-4 mb-4 p-5 rounded-lg shadow bg-white border border-gray-100">
      <div className="flex items-center gap-2 mb-5">
        <Cloud className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-semibold text-gray-800">Sää - {city}</h3>
      </div>

      <div className="flex items-center justify-center gap-8 mb-5">
        <img
          src={iconUrl}
          alt={weatherData.description}
          className="w-24 h-24"
        />
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {weatherData.temperature}°C
          </p>
          <div className="flex items-center gap-1 text-gray-600 ">
            <Thermometer className="w-4 h-4" />
            <span>Tuntuu kuin {weatherData.feelsLike}°C</span>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-900 capitalize font-medium mb-2 px-3 py-2 bg-blue-50 rounded-lg">
        {weatherData.description}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2">
          <div className="flex justify-center mb-1">
            <Droplets className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm text-gray-700">Kosteus:</p>
          <p className="text-base font-semibold">{weatherData.humidity}%</p>
        </div>

        <div className="text-center p-2">
          <div className="flex justify-center mb-1">
            <Wind className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-700">Tuuli: </p>
          <p className="text-base  font-semibold">
            {weatherData.windSpeed} m/s
          </p>
        </div>

        <div className="text-center p-2">
          <div className="flex justify-center mb-1">
            <Eye className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-sm text-gray-700">Näkyvyys: </p>
          <p className="text-base font-semibold">{weatherData.visibility} km</p>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100">
        <p className="text-center text-xs text-gray-600">
          Päivitetty: {lastUpdated}
        </p>
      </div>
    </div>
  );
}

export default WeatherWidget;
