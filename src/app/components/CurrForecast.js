function currForecast(props) {
    const data = props.data;
    
    const cityName = data.city.name;
    const temp = Math.round(data.list[0].main.temp);
    const tempMax = data.list[0].main.temp_max;
    const tempMin = data.list[0].main.temp_min;
    const wxDescr = data.list[0].weather[0].description;
    const wxIcon =  data.list[0].weather[0].icon;

    return(
        <div className="forecast forecast--curr">
            <div className="city-name">{cityName}</div>
            <div className="temp">{temp}&#186;</div>
            <img src={`http://openweathermap.org/img/wn/${wxIcon}.png`} alt="true" className="item wx-icon"/>
            <div className="wx-descr">{wxDescr}</div>
            <div className="temp-min">L:{tempMin}&#186;</div>
            <div className="temp-max">H:{tempMax}&#186;</div>
        </div>
    );
}

export default currForecast;