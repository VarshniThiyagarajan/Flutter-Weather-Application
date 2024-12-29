const API_KEY = '1c47eaf6616b445a9d0173200241210'; // Replace with your WeatherAPI key

// Get the current weather based on user input
function searchWeather() {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    fetchWeather(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
}

// Get live weather based on the user's location
function getLiveWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`;
                fetchWeather(url);
            },
            () => alert("Unable to retrieve your location.")
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Fetch weather data from the API
async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error(error.message);
        alert("Error fetching weather data. Please try again.");
    }
}

// Update the UI with the fetched weather data
function updateUI(data) {
    document.getElementById('city-name').innerText = `${data.location.name}, ${data.location.country}`;
    document.getElementById('current-date').innerText = new Date().toLocaleString();
    document.getElementById('temperature').innerText = `${data.current.temp_c}°C`;
    document.getElementById('description').innerText = data.current.condition.text;
    document.getElementById('feels-like').innerText = `Feels like: ${data.current.feelslike_c}°C`;
    document.getElementById('humidity').innerText = `${data.current.humidity}%`;
    document.getElementById('wind-speed').innerText = `${data.current.wind_kph} kph`;
    document.getElementById('pressure').innerText = `${data.current.pressure_mb} mb`;

    const iconUrl = `https:${data.current.condition.icon}`;
    document.getElementById('weather-icon').src = iconUrl;
}
