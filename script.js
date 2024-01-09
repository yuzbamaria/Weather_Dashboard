// OpenWeatherMap API URL and API Key
let apiURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
let apiKey = "1c60330a56dde7dbedc22ee4da656566"; 
let queryURL;

// DOM elements
let searchBtn = $('#search-button');
let todayWeather = $('#today');
let weatherForecast = $('#forecast');

let cityName;
let cityBtn;

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

        // Check if the city name already exists in the array
        const isDuplicate = citiesArray.includes(cityName);

        // Fetch weather data for the selected city
        fetchData();

        // Clear the input field
        $('#search-input').val('');

        // Add city to the array and update UI only if it's not a duplicate
        if (!isDuplicate) {
            citiesArray.push(cityName);
            renderInput();
        }
    });
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
        cityBtn.addClass('list-group-item mb-2 city');
         // Append buttons to the search history container
        $('#history').append(cityBtn);

        // Event listener for city button click
        cityBtn.on('click', function() {
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

// Function to convert and round temperature from Kelvin to Celsius
function kelvinToCelsius(tempK) {
    // Convert Kelvin to Celsius
    const tempC = tempK - 273.15;

    // Round the temperature
    const roundedCelsius = Math.round(tempC);
    return roundedCelsius;
}

// Function to round wind speed
function roundWindSpeed(windSpeed) {
    // Round the wind speed
    const roundedWindSpeed = Math.round(windSpeed);
    return roundedWindSpeed;
}

// Function to fetch weather data from OpenWeatherMap API
function fetchData() {
    // Clear today weather section 
    // todayWeather.empty();
    let todaySection = $('#today');
    todaySection.empty();
    /// Clear forecast weather section
    let forecastSection = $('#forecast');
    forecastSection.empty();
    
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
        console.log(data);
    
        // Populate today's weather
        const todayMain = $('<div>');
        todayMain.addClass('todayMain col-lg-12 col-md-9 col-sm-9 pb-2 mx-auto');

        const todayCardContainer = $('<div>');
        todayCardContainer.addClass('card shadow background-image');

        const todayCard = $('<div>');
        todayCard.addClass('card-body text-left');

        // Create City element as part of the title
        // Create data as a part of a title
        let dateTitleToday = data.list[0].dt_txt;
        dateTitleToday = dayjs().format('ddd, DD MMM');

        let icon = data.list[0].weather[0].icon;
        let iconURL = "https://openweathermap.org/img/w/" + icon + '.png';
        let iconImage = $('<img>');
        iconImage.attr('src', iconURL);

        let todayTitle = $('<h4>');
        todayTitle.text(cityName + " (" + dateTitleToday + ")");
        todayTitle.append(iconImage);
        console.log(todayTitle);
        
      
        let temp = kelvinToCelsius(data.list[0].main.temp);
        let p1 = $('<p>').text("Temperature: " + temp + " °C");
        let wind = roundWindSpeed(data.list[0].wind.speed);
        let p2 = $('<p>').text("Wind: " + wind + " KPH");
        let humidity = data.list[0].main.humidity;
        let p3 = $('<p>').text("Humidity: " + humidity + "%");

        todayCard.append(todayTitle);
        todayCard.append(p1, p2, p3);
        todayCardContainer.append(todayCard);
        todayMain.append(todayCardContainer);
        todayWeather.append(todayMain);

        // Group forecast data by day
        const dailyForecast = {};
        // Iterate through the results and group data by day
        for (let i = 0; i < data.list.length; i++) {
            const date = dayjs(data.list[i].dt_txt).format('ddd, DD MMM');
            if (!dailyForecast[date]) {
                dailyForecast[date] = data.list[i];
            }
        }

        // Populate #forecast
        // Create a card container
        let cardCount = 0; // Counter variable

        const forecastText = $('<h4>').text('5-day forecast:');
        forecastText.addClass('text-center');
        weatherForecast.append(forecastText);

        for (const date in dailyForecast) {
            // Skip today's forecast
            if (cardCount === 0 && dayjs(date).isSame(dayjs(), 'day')) {
                continue;
            }

            if (cardCount >= 5) {
                break; // Exit the loop after creating 5 cards
            }
            const dailyData = dailyForecast[date];
            const cardMain = $('<div>');
            cardMain.addClass('cardMain col-lg-2 col-md-4 col-sm-9 mb-3');

            const cardContainer = $('<div>');
            cardContainer.addClass('card align-items-center shadow custom-card');

            // Create a card body
            const cardBody = $('<div>');
            cardBody.addClass('card-body forecast-card');

            // Create a card title (h5)
            let forecastTitle = $('<h6>');
            forecastTitle.addClass('card-title');
            // let dateForecast = results[i].dt_txt;
            // dateForecast = dayjs(dateForecast).format('DD/MM/YYYY');
            let dateForecast = dailyData.dt_txt;
            dateForecast = dayjs(dateForecast).format('ddd, DD MMM');
            forecastTitle.text(dateForecast);
            
            // Create a card icon 
            // let iconForecast = data.list[0].weather[0].icon; 
            let iconForecast = dailyData.weather[0].icon;
            let iconForecastURL = "https://openweathermap.org/img/w/" + iconForecast + '.png';
            let iconImageForecast = $('<img>');
            iconImageForecast.attr('src', iconForecastURL);

            // Create a card text (p)
            const cardP1 = $('<p>');
            // let tempForecast = results[i].main.temp;
            let tempForecast = kelvinToCelsius(dailyData.main.temp);
            cardP1.addClass('card-text1');
            cardP1.text("Temperature: " + tempForecast + " °C");

            const cardP2 = $('<p>');
            // let windForecast = results[i].wind.speed;
            let windForecast = roundWindSpeed(dailyData.wind.speed);
            cardP2.addClass('card-text2');
            cardP2.text("Wind: " + windForecast + " KPH");

            const cardP3 = $('<p>');
            // let humidityForecast = results[i].main.humidity;
            let humidityForecast = dailyData.main.humidity;
            cardP3.addClass('card-text2');
            cardP3.text("Humidity: " + humidityForecast + "%");

            forecastTitle.append(iconImageForecast);
            // Append title and text to card body
            cardBody.append(forecastTitle);
            cardBody.append(cardP1, cardP2, cardP3);
           
            // Append card body to card container
            cardContainer.append(cardBody);

            cardMain.append(cardContainer);

            // Append the card to the forecast section
            weatherForecast.append(cardMain);

            cardCount++; // Increment the counter

        }
    })

    .catch(function (error) {
            console.error('Error:', error);
    });
   
}