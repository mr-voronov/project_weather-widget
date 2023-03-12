import { Component } from "react";
import getForecast from "../helpers/getForecast";
import CurrForecast from "../components/CurrForecast";
import FiveDayForecast from "../components/FiveDayForecast";
import DayForecast from "../components/DayForecast";
import "./Forecast.css";

class Forecast extends Component {
    constructor() {
        super();

        this.state = {
            error: null,
            isLoaded: false,
            data: null
        }
    }

    componentDidMount() {
        const { latitude, longitude } = this.props.state.coordinates;

        getForecast(latitude, longitude).then(data => {
            this.setState((prevState) => ({
                ...prevState,
                isLoaded: true,
                data
            }));
        }).catch(error => {
            this.setState((prevState) => ({
                ...prevState,
                isLoaded: true,
                error: error.message
            }));
        });
    }

    render() {
        const forecastType = this.props.state.forecastType;
        const { error, isLoaded, data } = this.state;

        if (error) {
            return(
                <div>{error}</div>
            );
        } else if (!isLoaded) {
            return(
                <div>Loading...</div>
            );
        } else {
            if (forecastType === "1") {
                return <CurrForecast data={data} />
            } else if (forecastType === "2") {
                return <DayForecast data={this.state.data} />
            } else if (forecastType === "3") {
                return <FiveDayForecast data={this.state.data} />
            }
        }
    }
}

export default Forecast;