import { Component } from 'react';
import getGeoposition from './helpers/getGeoposition';
import Location from './containers/Location';
import Forecast from './containers/Forecast';
import Settings from './components/Settings';
import './App.css';
import { ReactComponent as SettingsIcon } from "./static/settings_icon.svg";

class App extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
      isLoaded: false,
      coordinates: {
          latitude: null,
          longitude: null
      },
      forecastType: "1",
      settings: {
        isHidden: true
      }
    }

    this.setCoordinates = this.setCoordinates.bind(this);
    this.setForecastType = this.setForecastType.bind(this);
  }

  componentDidMount() {
    const coordInLocalStor = JSON.parse(localStorage.getItem("coordinates"));
    const { latitude, longitude } = this.state.coordinates;

    // won`t work for very first load, but for next tabs
    if (coordInLocalStor) {
      this.setState((prevState) => ({
        ...prevState,
        isLoaded: true,
          coordinates: {
            latitude: coordInLocalStor.latitude,
            longitude: coordInLocalStor.longitude,        
        }
      }));
    } else if (latitude === null || longitude === null) {
      console.log(2)
        getGeoposition().then((data) => {
          this.setState((prevState) => ({
            ...prevState,
            isLoaded: true,
            coordinates: {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude,        
            }
          }));
        }).catch(error => {
          console.log(error.message);

          this.setState((prevState) => ({
            ...prevState,
            isLoaded: true,
            error: error.message
          }));
        });
    }

    const forecastTypeInLocalStorage = localStorage.getItem("forecastType");
    const forecastTypeInState = this.state.forecastType;

    if (forecastTypeInLocalStorage) {
      if (forecastTypeInLocalStorage !== forecastTypeInState) {
        this.setForecastType(forecastTypeInLocalStorage)
      }
    }
  }


  setCoordinates(coordinates) {
    this.setState((prevState) => ({
        ...prevState,
        settings: {
          isHidden: true
        },
        coordinates
    }));
  }

  setForecastType(type) {
    this.setState((prevState) => ({
      ...prevState,
      settings: {
        isHidden: true
      },
      forecastType: type
    }));
  }

  showHideSettings() {
    const isHidden = this.state.settings.isHidden;

    if (isHidden) {
        this.setState((prevState) => ({
            ...prevState,
            settings: {
              isHidden: false
            }
        }));
    } else {
        this.setState((prevState) => ({
            ...prevState,
            settings: {
              isHidden: true
            }
        }));
    }
}


  render() {
    const { error, isLoaded } = this.state;
    const { latitude, longitude } = this.state.coordinates;
    const isHidden = this.state.settings.isHidden;

    if (error) {
      const promise = new Promise((resolve) => setTimeout(() => {
          this.setState((prevState) => ({
              ...prevState,
              error: null
          }));
      }, 2000));

      promise.catch((error) => {
          console.error(error);
      });

      return (
          <div>
              <p>{this.state.error}</p>
          </div>
      );
    } else if (!isLoaded) {
      return (
          <div>Loading...</div>
      );
    } else if (latitude === null || longitude === null) {
      return (
        <div className="weather-app">
          <Location setState={this.setCoordinates} />
        </div>
      );
    } else {
      if (isHidden) {
        return(
          <div className="weather-app">
            <SettingsIcon className="settings-icon" onClick={() => this.showHideSettings()}/>
            <Forecast state={{coordinates: this.state.coordinates, forecastType: this.state.forecastType}} />
          </div>
        );
      } else {
        return(
          <div className="weather-app">
            <SettingsIcon className="settings-icon" onClick={() => this.showHideSettings()}/>
            <Settings state={{coordinates: this.state.coordinates, forecastType: this.state.forecastType}} setState={{setCoordinates: this.setCoordinates, setForecastType: this.setForecastType}} />
          </div>
        );
      }
    }
  }
}

export default App;