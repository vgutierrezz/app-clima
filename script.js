const urlBase = `https://api.openweathermap.org/data/2.5/weather`
const API_KEY = '1d856afeff3e32df67e0c4bc5b1c37d7'
const difKelvin = 273.15 //Diferencia con los grados Kelvin

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if(city){
        llamarClima(city)
    }else{
        alert('Ingrese una ciudad valida');
    }
})

function llamarClima(city) {
    fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
    .then(data => data.json())
    .then(data => mostraClima(data))
}

function mostraClima(data) {
    const divResponseData = document.getElementById('responseData')
    divResponseData.innerHTML = ''
    
    //Tomo el json toda la información y la asigno a variables
    const cityName = data.name 
    const countryName = data.sys.country
    const temp = data.main.temp
    const humidity = data.main.humidity
    const description = data.weather[0].description
    const icon = data.weather[0].icon


    //Creo los elementos para el html
    const cityInfo = document.createElement('h2')
    cityInfo.textContent = `${cityName}, ${countryName}`

    const tempInfo = document.createElement('p')
    tempInfo.textContent = `La temperatura es ${Math.floor(temp-difKelvin)}°C` //redondeo para abajo de la temperatura en celcius

    const humidityInfo = document.createElement('p')
    humidityInfo.textContent = `La humedad es del ${humidity}%`

    const iconInfo = document.createElement('img')
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const descriptionInfo = document.createElement('p')
    descriptionInfo.textContent = `La descripciòn meteorológica es ${description}`

    //Agrego la información al html
    divResponseData.appendChild(cityInfo)
    divResponseData.appendChild(tempInfo)
    divResponseData.appendChild(humidityInfo)
    divResponseData.appendChild(iconInfo)
    divResponseData.appendChild(descriptionInfo)
}

