import "./Settings.css";


function Settings (props) {
    const forecastType = props.state.forecastType;
    const { setCoordinates, setForecastType } = props.setState;
    
    return (
        <div className="settings" >
            <button onClick={() => setCoordinates({latitude: null, longitude: null})}>Change Location</button>
            <select defaultValue={forecastType} onChange={(event) => {setForecastType(event.target.value)}}>
                <option value="1">Current Forecast</option>
                <option value="2">Day Forecast</option>
                <option value="3">Five Day Forecast</option>
            </select>
        </div>
    );
}

export default Settings;