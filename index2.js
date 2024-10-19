document.getElementById("getWeather").addEventListener("click", function() {
    const city = document.getElementById("city").value;
    const apiKey = "de82a346c8de38ca119576cc32f7b368";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError(error.message);
        });
});

function displayWeather(data) {
    const temperatureKelvin = data.main.temp;
    const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(0);
    const weatherId = data.weather[0].id;
    const weatherDescription = data.weather[0].description;

    document.getElementById("temperature").textContent = `${temperatureCelsius}℃`;
    document.getElementById("emoji").textContent = getWeatherEmoji(weatherId);
    document.getElementById("description").textContent = weatherDescription;
}

function displayError(error) {
    let message = '';
    switch (error) {
        case '400':
            message = 'Bad Request: Please check your input.';
            break;
        case '401':
            message = 'Unauthorized: Invalid API key.';
            break;
        case '404':
            message = 'City not Found: Please enter a valid city.';
            break;
        case '500':
            message = 'Internal Server Error: Please try again later.';
            break;
        default:
            message = 'An unexpected error occurred.';
    }
    document.getElementById("temperature").textContent = message;
    document.getElementById("emoji").textContent = '';
    document.getElementById("description").textContent = '';
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId <= 232) return "⛈️";
    if (weatherId >= 300 && weatherId <= 321) return "🌦️";
    if (weatherId >= 500 && weatherId <= 531) return "🌧️";
    if (weatherId >= 600 && weatherId <= 622) return "❄️";
    if (weatherId >= 701 && weatherId <= 741) return "🌫️";
    if (weatherId === 762) return "🌋";
    if (weatherId === 771) return "💨";
    if (weatherId === 781) return "🌪️";
    if (weatherId === 800) return "☀️";
    if (weatherId >= 801 && weatherId <= 804) return "☁️";
    return "";
}


