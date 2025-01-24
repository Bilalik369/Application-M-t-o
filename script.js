const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const favoritesList = document.getElementById('favorites-list');
const favoriteButton = document.getElementById('favorite-button');

search.addEventListener('click', () => {
    const APIKey = '283bb4cc073425a015da8969ee5c91ab';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = "city not found";
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.getElementById('weather-icon');
            const temperature = document.getElementById('temperature');
            const description = document.getElementById('description');
            const humidity = document.getElementById('humidity');
            const wind = document.getElementById('wind');

            if (cityHide.textContent === city) {
                return;
            } else {
                cityHide.textContent = city;
            }

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;
        })
        .catch(err => {
            console.error('Error fetching weather data:', err);
        });
});


favoriteButton.addEventListener('click', () => {
    const city = cityHide.textContent;

    if (!city || city === "city hide" || city === "city not found") {
        alert("No city to add to favorites!");
        return;
    }

    
    const existingCities = Array.from(favoritesList.children).map(li => li.textContent);
    if (existingCities.includes(city)) {
        alert(`${city} is already in favorites!`);
        return;
    }

    
    const li = document.createElement('li');
    li.textContent = city;

    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.style.marginLeft = '10px';
    removeButton.style.cursor = 'pointer';
    removeButton.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(removeButton);
    favoritesList.appendChild(li);

    
    favoriteButton.classList.toggle('active');
});


