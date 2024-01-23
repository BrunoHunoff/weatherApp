const apiKey = "fa705d2cc4df449f7e9253cdb11145bb";
const apiCountryURL = "https://flagsapi.com/BR/flat/64.png";
const iconURL = "http://openweathermap.org/img/wn/";
const bgAPI = "https://source.unsplash.com/1920x1080/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector('#weather-data');
const errorContainer = document.querySelector('#error');

// Funções

const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    if(data.cod == 200) {
        return data;
    }
    else if(data.cod == '404' || data.cod == '400') {
        errorContainer.classList.remove('hide');
        weatherContainer.classList.add('hide');
        throw new Error(`Cidade não encontrada ${city}`);
    }
};

const showWeatherData = async(city) => {
    errorContainer.classList.add('hide');

    let weatherData = await getWeatherData(city);

    console.log(weatherData);

    cityElement.innerHTML = weatherData.name;
    tempElement.innerHTML = parseInt(weatherData.main.temp);
    descElement.innerHTML = weatherData.weather[0].description;
    weatherIconElement.src = iconURL + weatherData.weather[0].icon + '.png';
    countryElement.src = apiCountryURL.replace('BR', weatherData.sys.country);
    humidityElement.innerHTML = weatherData.main.humidity;
    windElement.innerHTML = weatherData.wind.speed;

    city = city.replace(/\s/g, "")

    // Transforma (Cidade, estado, país) em array
    city = city.split(",");

    document.body.style.background = `url(${bgAPI + city[0]})`;
   
    weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {

    e.preventDefault();

        const city = cityInput.value;

    showWeatherData(city);

})

cityInput.addEventListener("keyup", (a) => {
    if (a.code == "Enter") {
        let city = a.target.value;

        showWeatherData(city);
    }
});