var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var cityContainerEl = document.querySelector('#city-container');
var fiveDaysContainerEl = document.querySelector('#five-days-container');

var formSubmitHandler = function(event) {

    event.preventDefault();

    var city = cityInputEl.value.trim();
}


var getCityWeather = function() {
    //create the variable for the value of the input from the user which is the name of teh city
    // search for latitud and the lon of the city and replace in the variables
    var lat = 32.71571;
    var lon = -117.16472;
    var units = "imperial";
    var apiKey = '4bba11dfee0efb4005da5f8d661387b5';
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    

    fetch(apiUrl)
        .then(function (response){
        return response.json();
        })
        .then(function(data) {
            console.log(data);
            for(var i = 0; i < data.list.length; i++) {
                console.log("City :" + data.city.name);
                console.log("Time: " + data.list[i].dt_txt);
                console.log("Temperature: " + data.list[i].main.temp);
                console.log("Wind: " + data.list[i].wind.speed + "MPH");
                console.log("Humidity: " + data.list[i].main.humidity);
            }
        });
}
/* var displayActualWeather = function(city) {
    
    for (var i = 0; i < city.length; i++) {
        var listItemEl = document.createElement('li');
        listItemEl.classList = 'list-group-item flex row';
        listItemEl.textContent = city[i].

    }
} */


getCityWeather();
userFormEl.addEventListener('submit', formSubmitHandler);