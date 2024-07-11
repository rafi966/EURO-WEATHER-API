document.addEventListener("DOMContentLoaded", function () {
    const countrySelect = document.getElementById("countrySelect");
    const weatherForecast = document.getElementById("weatherForecast");

    countrySelect.addEventListener("change", function () {
        const selectedCity = countrySelect.value;
        if (selectedCity) {
            const [latitude, longitude, city, country] = selectedCity.split(",");
            const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const forecastData = data.dataseries;
                    displayForecast(forecastData);
                })
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                });
        }
    });

    function displayForecast(forecastData) {
        weatherForecast.innerHTML = "";
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            const weather = forecastData[i].weather;
            const maxTemp = forecastData[i].temp2m.max;
            const minTemp = forecastData[i].temp2m.min;
            const image = getWeatherImage(weather);

            const card = document.createElement("li");
            card.classList.add("weather-card");
            card.innerHTML = `
                <div class="date">${date.toDateString()}</div>
                <img class="images" src="images/${image}.png" alt="${weather}">
                <div class="weather-type">${weather}</div>
                <div class="temperature">
                    <span class="max-temp">Max: ${maxTemp}°C</span>
                    <span class="min-temp">Min: ${minTemp}°C</span>
                </div>
            `;
            weatherForecast.appendChild(card);
        }
    }

    function getWeatherImage(weather) {
        // Mapping weather conditions to image names
        const weatherImages = {
            "clear": "clear",
            "cloudy": "cloudy",
            "fog": "fog",
            "humid": "humid",
            "ishower": "ishower",
            "lightrain": "lightrain",
            "lightsnow": "lightsnow",
            "mcloudy": "mcloudy",
            "oshower": "oshower",
            "pcloudy": "pcloudy",
            "rain": "rain",
            "rainsnow": "rainsnow",
            "snow": "snow",
            "tsrain": "tsrain",
            "tstorm": "tstorm",
            "windy": "windy"
        };
        return weatherImages[weather] || "unknown";
    }
});