import { Component } from "react";
import cityList from "../../data/city.list.json";
import SelectCountry from "../components/SelectCountry";
import SelectCity from "../components/SelectCity";
import "./Location.css";

class Location extends Component {
    constructor(props) {
        super(props);

        // should be also an error
        this.state = {
            location: {
                countryName: null,
                cityName: null
            }
        }

        this.setCountryName = this.setCountryName.bind(this);
        this.setCityName = this.setCityName.bind(this);
    }

    setCountryName(countryName) {
        this.setState((prevState) => ({
            ...prevState,
            location: {
                ...prevState.location,
                countryName
            }
        }));
    }

    setCityName(cityName) {
        this.setState((prevState) => ({
            ...prevState,
            location: {
                ...prevState.location,
                cityName
            }
        }));
    }

    render() {
        const { countryName, cityName } = this.state.location;
        const setCoordinates = this.props.setState;

        if (countryName === null) {
            let data = new Set(); // unique country names

            cityList.forEach((element) => {
                data.add(element.country);
            });

            data = Array.from(data).sort();

            return (
                <div className="location">
                    <label for="select-country" className="location__label">Select Country:</label>
                    <SelectCountry data={data} setState={this.setCountryName} />
                </div>
            );
        } else if (cityName === null) {
            const currCountry = this.state.location.countryName;
            const data = new Map(); // city name as key and whole object as value
            let cities = new Set(); // unique city names (in chosen country)
            
            cityList.forEach((element) => {
                if(element.country === currCountry) {
                    data.set(element.name, element);
                    cities.add(element.name);
                } 
            });

            cities = Array.from(cities).sort();

            return (
                <div className="location">
                    <label for="select-city" className="location__label">Select City:</label>
                    <SelectCity data={{data, cities}} setState={{setCityName: this.setCityName, setCoordinates: setCoordinates}}/>
                </div>
            );
        }
    }
}

export default Location;