
const apiKey = 'fb75eb5ca41f2fcb1f3920d13a1f69e1';

const main = document.querySelector('#main')
const form = document.querySelector('#form')
const search = document.querySelector('#search')

const url = (city) => 
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {

    let res = await fetch(url(city) ,{
        origin : 'cros'
    })
    let resData = await res.json()
    console.log(resData);
    addWeatherToPage(resData)
}

function Ktos(k){
    return Math.floor(k -273.15)
}

form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const city = search.value
    if(city){
        getWeatherByLocation(city)
    }
})

function addWeatherToPage(data){
    const temp = Ktos(data.main.temp)

    const weather = document.createElement('div')
    weather.classList.add('weather')
    let ico = data.weather[0].icon
    weather.innerHTML = `
        <div>
        <img src="https://openweathermap.org/img/wn/${ico}@2x.png"/>
        <span>${data.name}</span>
        <span>${temp}°C</span>
        <span>${data.weather[0].main}</span>
        </div>
    `

    main.innerHTML = '';
    main.appendChild(weather)
}