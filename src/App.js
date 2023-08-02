import React,{useState} from "react";
import axios from "axios";


function App(){

  const [data,setData]=useState({})
  const [location,setLocation]=useState('')


  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=ed8b4a363660ba59d768b8c5a6b56b03`
  
  const searchLocation=(event)=>{
      if(event.key==='Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
  }
  
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return(
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={event=> setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter location" 
        
        
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="Location">

            <h2>{data.name}</h2>
          </div>
          {data.name !== undefined &&
          <div className="date">{dateBuilder(new Date())}</div>
}
          <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

        </div>
          
        {data.name !== undefined &&
        <div className="bottom">
          <div className="feels">
          {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            </p>
            <p>Humidity</p>
          </div>
          <div className="wind">
           <p className="bold">   
           {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}</p>
           <p>Wind</p>
          </div>
        </div>
}
      </div>


    </div>
  )
}

export default App;