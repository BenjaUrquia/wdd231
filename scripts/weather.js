const currentTemp = document.querySelector('#current-temp')
const weatherIcon = document.querySelector('#weather-icon')
const figcaption = document.querySelector('figcaption')

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.63&appid=b090fd32a362009d6f610d02d94bed33&units=metric'

function displayWeather(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('desc', desc);
    figcaption.textContent = `${desc}`;
}

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            displayWeather(data);
        } else {
            throw Error(await response.text())
        }

    } catch (error) {
        console.log(error);
    }


}

apiFetch();
