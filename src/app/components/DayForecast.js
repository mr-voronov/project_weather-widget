function DayForecast(props) {
    const data = props.data;

    const dayWeatherData = (data) => {
        const weatherData = data.list; // only 3 hour forecast data
        const dayWeatherData = new Map();

        for (const [index, element] of weatherData.entries()) {
            if (index < 9) {
                const hours = index === 0 ? "Now" : element.dt_txt.split(" ")[1].slice(0, 2);
                const wxIcon = element.weather[0].icon;
                const temp = Math.round(element.main.temp);

                dayWeatherData.set(hours, [wxIcon, temp]);
            } 
        }

        return Array.from(dayWeatherData);
    }

    return (
        <div className="forecast forecast--day">{dayWeatherData(data).map((element, index) => {
            return (
                <div key={index} className="forecast__item">
                    <span className="hours">{element[0]}</span>
                    <img src={`http://openweathermap.org/img/wn/${element[1][0]}.png`} alt="true" className="wx-icon"/>
                    <span className="temp">{element[1][1]}&#186;</span>
                </div>
            );
        })}</div>
    );
}

export default DayForecast;