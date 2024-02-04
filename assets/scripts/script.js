// Declaration of variable to get the form element
var userFormEl = document.querySelector('#user-form');
// Declaration of the variable to get the input element of the city
var cityInputEl = document.getElementById('city');

// Declaration of the variable to get the element of the city info
var cityInfoEl = document.getElementById('city-info');
var cityContainerEl = document.getElementById('city-container');

// define the variable of the weather of five days container that the user search for
var fiveDaysContainerEl = document.querySelector('#five-days-container');

// define the variable to get the id of the short-cut div that will store the buttons of the cities as a short-cut
var shortcutEl = document.getElementById('short-cut');

// This variable stores the API key to make the requests to the OpenWeather API
var apiKey = '4bba11dfee0efb4005da5f8d661387b5';



// Function to get the current weather of the city
var getCityWeather = function(city) {
    if (!city) {
        console.log('City is required');
        return;
    }

    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            displayFiveDayWeather(lat, lon);
            var today = dayjs().format('(MM/DD/YYYY)');
            console.log(today);
            var iconDay = data.weather[0].icon;
            console.log(iconDay);
            
            var iconUrl = `http://openweathermap.org/img/w/${iconDay}.png`;
            var cityDetails = `
            <h1>${data.name} ${today}<span><img src="${iconUrl}"></span></h1>
            `;

            cityContainerEl.children[0].innerHTML = cityDetails;

            var p1 = document.createElement('p');
            p1.textContent = `Temp: ${data.main.temp}`;
            cityContainerEl.appendChild(p1);
            var p2 = document.createElement('p');
            p2.textContent = `Wind: ${data.wind.speed} MPH`;
            cityContainerEl.appendChild(p2);
            var p3 = document.createElement('p');
            p3.textContent = `Humidity: ${data.main.humidity} %`;
            cityContainerEl.appendChild(p3);
            //cityContainerEl.innerHTML = '';
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
}


var savedCities = JSON.parse(localStorage.getItem('cities')) || [];
var cityListDiv = document.getElementById('short-cut')
for (let i = 0; i < savedCities.length; i++) {
    const btnEl = document.createElement('button')
    btnEl.textContent = savedCities[i]
    btnEl.onclick = favoriteCity;
    cityListDiv.appendChild(btnEl)
}

function favoriteCity(event) {
    let element = event.target.textContent;
    console.log(element)
    getCityWeather(element)
}

var citiesArray = [];
// Handler for the form submission
var formSubmitHandler = function(event) {
    // Prevent the normal form submission
    event.preventDefault();
    var city = cityInputEl.value.trim();
        if(city === '') {
            alert("Please enter a city name");
        } 
        if(city) {
            getCityWeather(city);
        }
    if (savedCities) {
        //citiesArray = JSON.parse(savedCities);
        citiesArray.push(city);
    }
    citiesArray.push(city);
    localStorage.setItem('cities', JSON.stringify(citiesArray));
    console.log(citiesArray);
        
    // Clear the input value
    cityInputEl.value = '';


    
}

// Function to render the cities saved in the local storage
var renderCities = function() {
    var savedCities = localStorage.getItem('cities');
    var citiesArray = [];
    if (savedCities) {
        citiesArray = JSON.parse(savedCities);
    }
    for (var i = 0; i < citiesArray.length; i++) {
        var city = citiesArray[i];
        var cityBtn = document.createElement('button');
        cityBtn.textContent = city;
        cityBtn.classList = 'btn btn-secondary';
        shortcutEl.appendChild(cityBtn);
    }
}






document.addEventListener('DOMContentLoaded', function() {
    shortcutEl.addEventListener('click', function(event) {

        // Asegúrate de que se hizo clic en un botón
        if (event.target.tagName === 'BUTTON') {
            // Obtén el nombre de la ciudad del texto del botón
            var cityBtn = event.target.textContent;
            

            // Verifica que el nombre de la ciudad no esté vacío
            if (cityBtn) {
                // Limpia el contenido anterior antes de hacer una nueva solicitud
                cityInfoEl.innerHTML = '';
                fiveDaysContainerEl.innerHTML = '';

                // Haz una solicitud a la API con el nombre de la ciudad
                getCityWeather(cityBtn);
            } else {
                console.log('City is required');
            }
        }
})
});

// Function to display the five day weather forecast
var displayFiveDayWeather = function(lat, lon) {

    //fiveDaysContainerEl.innerHTML = '';
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var fiveDayForecast = data.list;
        //for (var i = 0; i < fiveDayForecast.length; i+=8) {
        for (var i = 0; i < fiveDayForecast.length; i++) {
            var dayData = fiveDayForecast[i];
            var weatherTime = dayData.dt_txt.split(' ')[1].split(':')[0];
            if (weatherTime === '12') {

            
            console.log(dayData);

            var date = dayData.dt_txt.split(' ')[0];
            var temp = dayData.main.temp;
            var humidity = dayData.main.humidity;
            var wind = dayData.wind.speed;
            var icon = dayData.weather[0].icon;
            var iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
            var card = document.createElement('div');
            card.classList = 'card';
            card.innerHTML = `
            <div class="card-body">
                <h1 class="pt-3 pb-3">5-Day Forecast</h1>
                <h5 class="card-title">${date}</h5>
                <img src="${iconUrl}" alt="weather icon">
                <p class="card-text">Temp: ${temp}°F</p>
                <p class="card-text">Humidity: ${humidity}%</p>
                <p class="card-text">Wind: ${wind}MPH</p>
            </div>
            `;

            fiveDaysContainerEl.appendChild(card);
            }
        }
    });
};

city = cityInputEl.value.trim();
getCityWeather(city);
userFormEl.addEventListener('submit', formSubmitHandler);

