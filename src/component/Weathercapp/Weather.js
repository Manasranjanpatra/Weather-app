import React, { useState } from 'react'
import './Weather.css'
import Search from '../Assets/search.png';
import drizzle from '../Assets/drizzle.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png';
import wind from '../Assets/wind.png';
import humidity from '../Assets/humidity.png';
import cloud from '../Assets/cloud.png';
import Clear from '../Assets/clear.png';


const Weather = () => {
  let apikey = "634f6dd6870766bc222571a73d56ad6d";
 

  const [wicon, setwicon] = useState(drizzle);

  const search = async () => {
    const element = document.getElementsByClassName("inputcity")
    if (element[0].value === "") {
      return 0;
    }
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${apikey}`;
    let response = await fetch(url);
    let data = await response.json();
   
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const tempreture = document.getElementsByClassName("weathertemp");
    const location = document.getElementsByClassName("weaqtherlocation");
    const p= document.querySelector(".p")
        
    if(data.cod===200){
      p.innerHTML="";
      
    }
    else{
      p.innerHTML=data.message;
      return 0;
      
    }
    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " km/h";
    tempreture[0].innerHTML = data.main.temp + " 'c";
    location[0].innerHTML = data.name;
    
    

    if (data.weather[0].icon === "01n" || data.weather[0].icon === "01d" || data.weather[0].icon === "02n") {
      setwicon(Clear);
     

    }
    if (data.weather[0].icon === "03d" ||  data.weather[0].icon === "03n") {
      
      setwicon(cloud);
    }
  

    if (data.weather[0].icon === "04d" ||  data.weather[0].icon === "04n") {
      setwicon(cloud);

    }
    if (data.weather[0].icon === "09d" ||  data.weather[0].icon === "09n") {
      setwicon(rain);

    }
    if (data.weather[0].icon === "10d" ||  data.weather[0].icon === "10n") {
      setwicon(rain);

    }
    if (data.weather[0].icon === "13d" ||  data.weather[0].icon === "13n") {
      setwicon(snow);
    }
    if (data.weather[0].icon === "50d"){
      setwicon(drizzle);

    }
    // else {
    //   setwicon(cloud);
    // }
  }
  return (
    <div className='container'>
      <div className="subcontainer">
        <input className='inputcity' type='text' placeholder='Enter the city...' />
        <div className="searchicon" onClick={() => { search() }}>
          <img src={Search} alt="Search" />
        </div>
      </div>
        <p className="p"></p>
      <div className="weatherimage">
        <img src={wicon} alt="cloud" />
      </div>
      <div className="weathertemp">24'c</div>
      <div className="weaqtherlocation">London</div>
      <div className="datacontainer">
        <div className="element">
          <img src={humidity} alt="humidity" className='icon' />
          <div className="data">
            <div className="humidity-percent"> 64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="wind" className='icon' />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">wind speed</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Weather
