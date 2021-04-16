import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from './Weather';

const API_KEY = "b0369d253624b5637f69129bd007c070";

export default class extends React.Component {
  state = {
    isLoaing: true
  };
  getWeather = async(latitude, longitude) =>{
    const {
       data: {
         main: {temp},
         weather 
        } } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({
      isLoaing: false,
      condition: weather[0].main, 
      temp
    });
  };
  getLocation = async() => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const { 
        coords: { latitude, longitude }
       } = await Location.getCurrentPositionAsync();
       this.getWeather(latitude, longitude)    
    } catch (error) {
    
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoaing, temp, condition } = this.state;
    return isLoaing ?  <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}
