var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var cityContainerEl = document.querySelector('#city-container');
var fiveDaysContainerEl = document.querySelector('#five-days-container');

var formSubmitHandler = function(event) {

    event.preventDefault();

    var city = cityInputEl.value.trim();
}


var getCityWeather = function(lat, lon) {
    var lat = 32.71571;
    var lon = -117.16472;
    var apiKey = '4bba11dfee0efb4005da5f8d661387b5';
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    

    fetch(apiUrl)
      .then(function (response){
        if(response.ok) {
            response.json().then(function (data){
                displayWeather(data.list);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
      });
};

var displayWeather = function() {
    /* if() {
        
    } */
}


userFormEl.addEventListener('submit', formSubmitHandler);