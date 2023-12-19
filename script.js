let apiURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
let apiKey = "1c60330a56dde7dbedc22ee4da656566"; 
let queryURL;
let searchBtn = $('#search-button');
let cityName;
let cityBtn;
let todayWeather = $('#today');
let todayTitle = $('<h2>');
let weatherForecast = $('#forecast');


// Create an empty array to store city names from user input in global scope
let citiesArray = [];
// Create a function that gets user input
function getUserInput() {
    // Add event listener to Search button to capture cities from user input
    searchBtn.on('click', function (event) {
        // Prevent submit
        event.preventDefault();
        // Declare a variable to store the value of user input
        cityName = $('#search-input').val();
        console.log('User input:', cityName);

        // if there's nothing in the form entered, don't print to the page
        if (!cityName) {
            alert("No city filled out in form! Please, add any city you'd like to check the weather forecast for");
            return;
        }
        // Push cities from user input to citiesArray 
        citiesArray.push(cityName);
        // Call function to render cities from user input 
        renderInput();
        fetchData();
    })
}
getUserInput();

function renderInput(city) {
    $('#history').empty();
    for (let i = 0; i < citiesArray.length; i++) {
        cityBtn = $('<button>');
        cityBtn.text(citiesArray[i]);
        cityBtn.addClass('list-group-item city');
        // cityBtn.on('click');
        $('#history').append(cityBtn);
    }
    storeCityList();
}

function storeCityList() {
    localStorage.setItem('city-names', JSON.stringify(citiesArray));
}

// date 15/9/2022
// icon
// temp: in celcius
// wind: 
// humidity:

// When a user views the current weather conditions for that city they are presented with:
    // The city name
    // The date
    // An icon representation of weather conditions
    // The temperature
    // The humidity
    // The wind speed
// When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
    // The date
    // An icon representation of weather conditions
    // The temperature
    // The humidity

function fetchData() {
    //  Build the API query URL based on the user input value
    queryURL = apiURL +  cityName + "&appid=" + apiKey;
    console.log('query: ', queryURL);

    fetch(queryURL)
    .then(response => response.json())
    .then(function (data) {
        console.log(data);

        // Populate #today
        let date = data.list[0].dt_txt;
        todayTitle.text(cityName + " (" + date + ")");
        let temp = data.list[0].main.temp;
        let p1 = $('<p>').text("Temperature: " + temp);
        let wind = data.list[0].wind.speed;
        let p2 = $('<p>').text("Wind: " + wind + " KPH");
        let humidity = data.list[0].main.humidity;
        let p3 = $('<p>').text("Humidity: " + humidity + "%");
        todayWeather.append(todayTitle, p1, p2, p3);

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
            const cardTitle = $('<h5>');
            cardTitle.addClass('card-title');
            cardTitle.text(results[i].dt_txt);
            console.log(cardTitle);

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
            cardBody.append(cardTitle);
            cardBody.append(cardP1, cardP2, cardP3);
            console.log(cardBody);
            
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

function renderToday() {
}

function renderForecast() {
}


// function fetchCityWeather() {
//     //  Build the API query URL based on the user input value
//         queryURL = apiURL + userInputValue + "&appid=" + apiKey;
//         console.log('query: ', queryURL);
//         // Fetch data from the API using the constructed query URL
//         fetch(queryURL)
//             // Using the .then method to handle the response from the fetch operation
//             .then(function (response) {
//                 // Parse the response as JSON
//                 // Returns a Promise that resolves to the parsed JSON data
//                 return response.json();
//             })
//             .then(function (data) {
//                 // Log the entire data object and the articles array to the console
//                 console.log(data);
//                 console.log(data.city.name);
//             });
//         }
    
    



// TODO
// 1. When user search for a city in the input, call weather API and show the result in the HTML
//    - Add event listener to form submit
//    - Get the user input value
//    - Build the API query URL based on the user input value
//    - Call the API and render the result in the HTML
//        - Get the city name and show it in the main weather forecast card
//        - Get the first weather forecast item and get the following values
//            - date
//            - temperature
//            - wind speed
//            - humidity
//            - icon
//        - render those values to the main card
//        - Loop through all weathers array and get the following values
//            - date
//            - temperature
//            - wind speed
//            - humidity
//            - icon
//        - render those values to the smaller card
// 2. When user search for a city, store it in local storage
// 3. On initial page load load the search history and show it as a list in the HTML
//    - ....
//    - Build the API query URL based on the history stored in local storage
//    - Call the API and render the result in the HTML
// 4. When user click on the search history, call weather API and show the result in the HTML
// 5. CSS

// fetch('https://api.openweathermap.org/data/2.5/forecast?q=london&appid=[api-key]&units=metric')
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     })