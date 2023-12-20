// OpenWeatherMap API URL and API Key
let apiURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
let apiKey = "1c60330a56dde7dbedc22ee4da656566"; 
let queryURL;

// DOM elements
let searchBtn = $('#search-button');
let cityName;
let cityBtn;
let todayWeather = $('#today');
let weatherForecast = $('#forecast');

// Array to store user's searched cities
let citiesArray = [];

// Function to handle user input
function getUserInput() {
    // Event listener for search button click
    searchBtn.on('click', function (event) {
        event.preventDefault();
         // Get the value of user input city name
        cityName = $('#search-input').val();
        // console.log('User input:', cityName);
        // Validate user input
        if (!cityName) {
            alert("No city filled out in form! Please, add any city you'd like to check the weather forecast for");
            return;
        }
        // Add city to the array and update UI
        citiesArray.push(cityName);
        renderInput();
        // Fetch weather data for the selected city
        fetchData();
        // Clear the input field
        $('#search-input').val('');
    })
}
// Initial call to getUserInput function
getUserInput();

// Function to render user's search history
function renderInput(city) {
    // Clear the search history container
    $('#history').empty();
    // Iterate through the cities array and create buttons
    for (let i = 0; i < citiesArray.length; i++) {
        cityBtn = $('<button>');
        cityBtn.text(citiesArray[i]);
        cityBtn.addClass('list-group-item city');
         // Append buttons to the search history container
        $('#history').append(cityBtn);

        // Event listener for city button click
        $('#history').on('click', '.city', function() {
            // $('#history').empty();
            // $('#search-input').val('');
            const selectedCity = $(this).text();
            // Set the selected city as the current city and fetch data
            cityName = selectedCity;
            // todayWeather.empty();
            // weatherForecast.empty();
            fetchData();
        });
    }
    // Store the updated city list in local storage
    storeCityList();
}

// Function to store the city list in local storage
function storeCityList() {
    localStorage.setItem('city-names', JSON.stringify(citiesArray));
}

// Function to fetch weather data from OpenWeatherMap API
function fetchData() {
    // Clear today weather section 
    todayWeather.empty();
    /// Clear forecast weather section
    let forecastEl2 = $('#forecast');
    console.log(forecastEl2);
    forecastEl2.empty();
    
    // let forecastEl = document.querySelector('#forecast');
    // console.log(forecastEl);
    // forecastEl.innerHTML = '';
    // console.log(forecastEl);

    //  Build the API query URL based on the user input value
    queryURL = apiURL +  cityName + "&appid=" + apiKey;
    // Fetch data from the API
    fetch(queryURL)
    .then(response => response.json())
    .then(function (data) {
        // Populate today's weather
        const todayCardContainer = $('<div>');
        todayCardContainer.addClass('card todayCardContainer');

        const todayCard = $('<div>');
        todayCard.addClass('card-body todayCard');

        let todayTitle = $('<h3>');
        let dateTitle = data.list[0].dt_txt;
        dateTitle = dayjs().format('DD/MM/YYYY');
        todayTitle.text(cityName + " (" + dateTitle + ")");

        let temp = data.list[0].main.temp;
        let p1 = $('<p>').text("Temperature: " + temp);
        let wind = data.list[0].wind.speed;
        let p2 = $('<p>').text("Wind: " + wind + " KPH");
        let humidity = data.list[0].main.humidity;
        let p3 = $('<p>').text("Humidity: " + humidity + "%");

        todayCard.append(dateTitle);
        todayCard.append(p1, p2, p3);
        todayCardContainer.append(todayCard);
        todayWeather.append(todayCardContainer);

        // Populate #forecast
        // Create a card container
        let results = data.list;
        for (let i=0; i<results.length; i++) {
            const cardContainer = $('<div>');
            cardContainer.addClass('card', 'mb-3');

            // Create a card body
            const cardBody = $('<div>');
            cardBody.addClass('card-body');

            // Create a card title (h5)
            let cardTitleDate = $('<h5>');
            cardTitleDate.addClass('card-title');
            cardTitleDate.text(results[i].dt_txt);
            cardTitleDate = dayjs().format('DD/MM/YYYY');

            // Create a card text (p)
            const cardP1 = $('<p>');
            let tempForecast = results[i].main.temp;
            cardP1.addClass('card-text1');
            cardP1.text("Temperature: " + tempForecast);

            const cardP2 = $('<p>');
            let windForecast = results[i].wind.speed;;
            cardP2.addClass('card-text2');
            cardP2.text("Wind: " + windForecast + " KPH");

            const cardP3 = $('<p>');
            let humidityForecast = results[i].main.humidity;;
            cardP3.addClass('card-text2');
            cardP3.text("Humidity: " + humidityForecast + "%");

            // Append title and text to card body
            cardBody.append(cardTitleDate);
            cardBody.append(cardP1, cardP2, cardP3);
           
            // Append card body to card container
            cardContainer.append(cardBody);

            // Append the card to the forecast section
            weatherForecast.append(cardContainer);
        }
    })
    .catch(function (error) {
            console.error('Error:', error);
    });
   
}

// Add icons 
// Clear today and forecast sections 
// Add Day JS - correct date format 
// Add Bootstrap CSS
// Check responsiveness
