const jokeContainer = document.getElementById("jokes-container") as HTMLElement;
const jokeButton = document.getElementById("getJokes") as HTMLElement;
const scoreButtons = document.querySelector(".scoreButtons") as HTMLElement;
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
    } else {
        getChuckNorrisJoke();
    }
    if (jokeIndex === 0) {
        scoreButtons.style.display = "block";
    }
    jokeIndex++;
});

interface ScoredJoke {
    joke: string | undefined;
    score: number;
    date: string;
}

const reportJokes: ScoredJoke[] = [];

function scores(number: number): void {
    const n: HTMLElement | null = document.getElementById("jokes-container");
    const joke: string | undefined = n?.innerHTML;

    reportJokes.forEach((item, index) => {
        if (item.joke === joke) {
            reportJokes.splice(index, 1);
        }
    });

    const score: number = number;
    const date: string = new Date().toISOString();
    const scoredJoke: ScoredJoke = { joke, score, date };

    reportJokes.push(scoredJoke);
    console.log(reportJokes);
}

const API_URL_WEATHER = "http://api.weatherapi.com/v1";
const weatherIcon = document.getElementById("weatherIcon") as HTMLImageElement;
const weatherInfo = document.getElementById("weatherInfo") as HTMLElement;
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