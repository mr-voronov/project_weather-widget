import { Component } from "react";
import "./Settings.css";


class Settings extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // when changing location from settings only Settings.js (not App.js) hooks componentDidMount()
        localStorage.setItem("coordinates", JSON.stringify(this.props.state.coordinates));
    }

    componentDidUpdate() {
        localStorage.setItem("forecastType", this.props.state.forecastType);
    }


    render() {
        const forecastType = this.props.state.forecastType;
        const { setCoordinates, setForecastType } = this.props.setState;

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
}

export default Settings;