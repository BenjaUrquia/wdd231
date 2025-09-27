document.addEventListener("DOMContentLoaded", function () {
    const currentTemp = document.querySelector('#current-weather')
    const forecastTemp = document.querySelector('#weather-forecast')

    const currentTempUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=-32.96&lon=-60.68&appid=b090fd32a362009d6f610d02d94bed33&units=metric'
    const forecastTempUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-32.95&lon=-60.69&appid=ed5c1e760f1030c46bb9a5858b2d4c74&units=metric'

    // DATE
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    const dayAfterAfterTomorrow = new Date(today);
    dayAfterAfterTomorrow.setDate(today.getDate() + 3);
    const options = { weekday: 'long' };


    function displayWeather(data) {
        currentTemp.innerHTML = `
        <h2>Current Weather</h2>
        <img id="weather-icon" src="" alt="">
        <div>
        <p><strong>Temp:</strong> ${data.main.temp} &deg;C</p>
        <strong><figcaption></figcaption></strong>
        <p><strong>High:</strong> ${data.main.temp_max} &deg;C</p>
        <p><strong>Low:</strong> ${data.main.temp_min} &deg;C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        </div>`
        const weatherIcon = document.querySelector('#weather-icon')
        const figcaption = document.querySelector('figcaption')
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        let desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('desc', desc);
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        figcaption.textContent = `${desc}`;
    }

    function displayForecast(data) {
        forecastTemp.innerHTML = `
        <h2>Weather Forecast</h2>
        <p><strong>${tomorrow.toLocaleDateString('en-US', options)}:</strong> ${data.list[0].main.temp} &deg;C</p>
        <p><strong>${dayAfterTomorrow.toLocaleDateString('en-US', options)}:</strong> ${data.list[1].main.temp} &deg;C</p>
        <p><strong>${dayAfterAfterTomorrow.toLocaleDateString('en-US', options)}:</strong> ${data.list[2].main.temp} &deg;C</p>
    `
    }

    async function apiFetch(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                return data;
            } else {
                throw Error(await response.text())
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function renderWeather(url1, url2) {
        const data1 = await apiFetch(url1);
        const data2 = await apiFetch(url2);

        displayWeather(data1);
        displayForecast(data2);
    }

    renderWeather(currentTempUrl, forecastTempUrl);

});