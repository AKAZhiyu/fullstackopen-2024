import axios from 'axios'
import { useState, useEffect } from 'react'

const Display = ({ countries, setCountries }) => {

    const handleShow = (country) => {
        setCountries([country])
    }

    const [weather, setWeather] = useState(null);

    if (countries.length === 0) {
        return <div>not found</div>
    } else if (countries.length === 1) {
        const country = countries[0];
        const weather_api_key = import.meta.env.VITE_WEATHER_KEY;
        const [lat, lon] = country.latlng;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}`
        axios.get(url)
             .then(res => {
                setWeather(res.data)
             })

        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>
                <h2>languages:</h2>
                <ul>
                    {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.png} alt={`national flag of ${country.name.common}`}></img>
                <h2>Weather in {country.capital}</h2>
                {weather ? (
                    <div>
                        <div>{weather.weather[0].main}:  {weather.weather[0].description}</div>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
                        <div>Temperature: {weather.main.temp.toFixed(2)} Celcius</div>
                        <div>Wind: {weather.wind.speed} m/s</div>
                    </div>
                ) : (
                    <div>Loading weather...</div>
                )}
                {/* https://api.openweathermap.org/data/2.5/weather?lat=22&lon=33&appid=d4162d7ba6b2a382658726aabb8cb41e */}
                    
            </div>
        );
    } else if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (countries.length <= 10 && countries.length > 0) {
        return countries.map(country => <div key={country.name.common}>{country.name.common}<button onClick={() => handleShow(country)}>show</button></div>)
    } else {
        return <div>Some Error Happened......</div>
    }

}

export default Display