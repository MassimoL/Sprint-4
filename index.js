"use strict";
const jokeContainer = document.getElementById("jokes-container");
const jokeButton = document.getElementById("getJokes");
const scoreButtons = document.querySelector(".scoreButtons");
let jokeIndex = 0;
const dadJokesApiUrl = 'https://icanhazdadjoke.com/';
const chuckNorrisApiUrl = 'https://api.chucknorris.io/jokes/random';
function getDadJoke() {
    fetch(dadJokesApiUrl, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
        jokeContainer.textContent = data.joke;
    })
        .catch(error => {
        console.log("Error", error);
    });
}
function getChuckNorrisJoke() {
    fetch(chuckNorrisApiUrl)
        .then(response => response.json())
        .then(data => {
        jokeContainer.textContent = data.value;
    })
        .catch(error => {
        console.log("Error", error);
    });
}
jokeButton.addEventListener('click', () => {
    if (jokeIndex % 2 === 0) {
        getDadJoke();
    }
    else {
        getChuckNorrisJoke();
    }
    if (jokeIndex === 0) {
        scoreButtons.style.display = "block";
    }
    jokeIndex++;
});
const reportJokes = [];
function scores(number) {
    const n = document.getElementById("jokes-container");
    const joke = n === null || n === void 0 ? void 0 : n.innerHTML;
    reportJokes.forEach((item, index) => {
        if (item.joke === joke) {
            reportJokes.splice(index, 1);
        }
    });
    const score = number;
    const date = new Date().toISOString();
    const scoredJoke = { joke, score, date };
    reportJokes.push(scoredJoke);
    console.log(reportJokes);
}
const API_URL_WEATHER = "http://api.weatherapi.com/v1";
const weatherIcon = document.getElementById("weatherIcon");
const weatherInfo = document.getElementById("weatherInfo");
const API_KEY = '1c9c6cb101e7e4d9930b3d50a680e21a';
function getWeather() {
    navigator.geolocation.getCurrentPosition((success) => {
        const { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
            const { temp } = data.main;
            weatherInfo.innerHTML = `${Math.trunc(temp)} ºC`;
            const icon = data.weather[0].icon;
            weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        });
    });
}
getWeather();
