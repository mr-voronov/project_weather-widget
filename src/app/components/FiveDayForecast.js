function FiveDayForecast(props) {
    const data = props.data.list;

    function indexWeatherDataByDay(data) {
        const res = new Map();

        data.forEach((elem) => {
            const date = new Date(elem.dt * 1000); // convert to unix (seconds) from default js (miliseconds)
            const weekday = new Intl.DateTimeFormat("en-US", {weekday: "long"}).format(date);

            if (!res.has(weekday)) {
                res.set(weekday, [elem]);
            } else {
                res.set(weekday, [...res.get(weekday), elem]);
            }
        });

        return res;
    }

    const dailyWeatherData = () => {
        const result = [];
        const indexWDByDay = indexWeatherDataByDay(data);

        // array from map keys to access key index
        const days = Array.from( indexWDByDay.keys() ); // MapIterator {'Sunday', 'Monday', …}
        let currTime = null;
        
        for (const [key, value] of indexWDByDay.entries()) { // MapIterator {'Sunday' => Array(4), 'Monday' => Array(8),  …}
            let dayName = (key === days[0]) ? "Today" : key;
            let wxIcon = null;
            let minTemp = null;
            let maxTemp = null;
    
            // setting currTime for getting weather condition (clear sky, clouds...) in ~ 24h from now
            if (key === days[0]) {
                const currDateTime = value[0].dt_txt;
                currTime = currDateTime.split(' ')[1]; // ['2023-03-19', '12:00:00']
            }
    
            // iterating over arrays (6) of objects (8 for a whole day) with 3 hour weather data 
            for (let i = 0; i < value.length; i++) {
                // getting weather condition icon for a future days at this time
                const time = value[i].dt_txt.split(" ")[1];
    
                if (key === days[5]) { // special case for the last day
                    if (wxIcon === null) { // needs to be set only once
                        wxIcon = value[value.length - 1].weather[0].icon;
                    }
                } else {
                    if (time === currTime) {   
                        wxIcon = value[i].weather[0].icon; // icon of weather status 
                    }
                }           
    
                // accumulating min temp of the day
                if (minTemp === null) {
                    minTemp = value[i].main.temp_min;
                } else {
                    if (minTemp > value[i].main.temp_min) {
                        minTemp = value[i].main.temp_min;
                    }
                }
    
                // accumulating max temp of the day
                if (maxTemp === null) {
                    maxTemp = value[i].main.temp_max;
                } else {
                    if (maxTemp < value[i].main.temp_max) {
                        maxTemp = value[i].main.temp_max;
                    }
                }
            }
            result.push([dayName, wxIcon, Math.round(minTemp), Math.round(maxTemp)]);
        }

        return result;
    }

    return(
        <div className="forecast forecast--five-days">
            {dailyWeatherData().map((element, index) => {
                return (
                    <div key={index} className="forecast__item">
                        <span className="day-name">{element[0]}</span>
                        <img src={`http://openweathermap.org/img/wn/${element[1]}.png`} alt="true" className="wx-icon"/>
                        <span className="temp-min">{element[2]}&#186;</span>
                        <span className="temp-max">{element[3]}&#186;</span>
                    </div>
                );
            })}
        </div>
    );
}

export default FiveDayForecast;