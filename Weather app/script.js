const apiKeyWeather = '970faca96a56ff7d20d4417e3105bd41';
const apiKeyUnsplash = 'qfDKgdTVhA9Q-a4ZH6B3eSQZqRa8Pmlcxbqhk07opcQ';

async function fetchWeather() {
  const cityInput = document.getElementById('city-input');
  const cityName = cityInput.value;
  const weatherData = document.getElementById('weather-data');
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKeyWeather}`);
  const data = await response.json();
  if(data.cod === '404') {
    weatherData.innerHTML = "City not found!";
    return;
  }
  const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
  weatherData.innerHTML = `Temperature in ${cityName}: ${temperature}°C`;

  const imgResponse = await fetch(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=${apiKeyUnsplash}`);
  const imgData = await imgResponse.json();
  if(imgData.results.length > 0) {
    document.body.style.backgroundImage = `url(${imgData.results[0].urls.regular})`;
  }
}
