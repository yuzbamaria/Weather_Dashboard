let apiURL = "api.openweathermap.org/data/2.5/forecast?q=";
let apiKey = "1c60330a56dde7dbedc22ee4da656566";
let queryURL;
let searchBtn = $('#search-button');

// When user searches for a city in the input, call weather API and show the result in the HTML
// Function to get the user input
// function getUserInput() {
//     // Event handler for the "Search" button click
//     // Add event listener to form submit
//     searchBtn.on('click', function(event){
//         event.preventDefault();
//         // Get the user input value
//         let userInputValue = $('#search-input').val();
//         fetchCityWeather(userInputValue);
//     });
// }

// getUserInput(); 

// function fetchCityWeather() {
// //  Build the API query URL based on the user input value
//     queryURL = apiURL + userInputValue + "&appid=" + apiKey;
//     console.log('query: ', queryURL);
//     // Fetch data from the API using the constructed query URL
//     fetch(queryURL)
//         // Using the .then method to handle the response from the fetch operation
//         .then(function (response) {
//             // Parse the response as JSON
//             // Returns a Promise that resolves to the parsed JSON data
//             return response.json();
//         })
//         .then(function (data) {
//             // Log the entire data object and the articles array to the console
//             console.log(data);
//             console.log(data.city.name);
//         });
//     }




//   

//  
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
// Create an empty array to store cities that user searched for 

// var shoppingFormEl = $('#shopping-form');
// var shoppingListEl = $('#shopping-list');

// // create function to handle form submission
// function handleFormSubmit(event) {
//   event.preventDefault();

//   // select form element by its `name` attribute and get its value
//   var shoppingItem = $('input[name="shopping-input"]').val();

//   // if there's nothing in the form entered, don't print to the page
//   if (!shoppingItem) {
//     console.log('No shopping item filled out in form!');
//     return;
//   }

//   // print to the page
//   shoppingListEl.append('<li>' + shoppingItem + '</li>');

//   // clear the form input element
//   $('input[name="shopping-input"]').val('');
// }

// // Create a submit event listener on the form element
// shoppingFormEl.on('submit', handleFormSubmit);

// Create an empty array to store city names from user input in global scope
let citiesArray = [];
// Create a function that gets user input
function getUserInput() {
    // Add event listener to Search button to capture cities from user input
    searchBtn.on('click', function(event) {
        // Prevent submit
        event.preventDefault();
        // Declare a variable to store the value of user input
        let cityEl = $('#search-input').val();
        // console.log(cityEl);
        // Push cities from user input to citiesArray 
        citiesArray.push(cityEl);
        // Call function to render cities from user input 
        renderInput();
    })
}
getUserInput();

function renderInput(city) {
    $('#history').empty();
    for (let i=0; i<citiesArray.length; i++) {
        const cityLiEl = $('<button>');
        cityLiEl.text(citiesArray[i]);
        cityLiEl.addClass('list-group-item city');
        // cityLiEl.on('click');
        $('#history').append(cityLiEl);
    }
    storeCityList();
}

function storeCityList() {
    localStorage.setItem('city-names', JSON.stringify(citiesArray));
}

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