const form = document.querySelector('#weatherHere')

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let cityName = document.querySelector('#cityName').value
    loadData(cityName)
    console.log(cityName)
})


const getData = async (cityName) => {
    let weatherCheck = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3aa4b2db82f9be47a511f897a23aafa9`)
    console.log(weatherCheck)
    return weatherCheck
}

const DOM_Elements = {
    weather: '.weather-list'
}

const createAtmos = (high, low, forecast, humidity) => { 
    const html =`<table class="table">
    <thread>
        <th id="high">High</th>
        <th id="low">Low</th>
        <th id="forecast">Forecast</th>
        <th id="humidity">Humidity</th>
    </thread>
    <tbody>
        <th id="high2">${((high - 273.15) * 9 / 5 + 32).toFixed(0)}°F</th>
        <th id="low2">${((low - 273.15) * 9 / 5 + 32).toFixed(0)}°F</th>
        <th id="forecast2">${forecast}</th>
        <th id="humidity2">${humidity}%</th>
    </tbody>`

    document.querySelector(DOM_Elements.weather).insertAdjacentHTML('beforeend',html)
}

const loadData = async (cityName) => {
    clearData()
    const weatherCheck = await getData(cityName);
    createAtmos(weatherCheck.data.main.temp_max, weatherCheck.data.main.temp_min, weatherCheck.data.weather[0].main, weatherCheck.data.main.humidity)
}

const clearData = () =>{
    document.querySelector(DOM_Elements.weather).innerHTML = '';
}


function buttonFunction(){
    document.getElementById("buttonAppear").innerHTML = '<button type=\"submit\" class=\"clearButton\" onClick=\"clearData()\">Clear Weather</button>';
}