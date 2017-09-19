import React from "react";
import MyStore from "./store";
import Actions from "./actions";
import Reflux from "reflux";

export default class CurrentWeather extends Reflux.Component{
	constructor(props){
		super(props);
		this.state = {
			
		}
	this.store = MyStore;
	}


	onGetWeekDay(date){
		let d = new Date();
			d.setTime(Date.parse(date));
		let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
			weekDay = days[d.getDay()];
			return weekDay;
	}

	getDirectionWind(windDeg){
		let nameWind;
		if(windDeg == 0 && windDeg <=10){
			nameWind = "N";
		}else if(windDeg >= 11 && windDeg <= 80){
			nameWind = "NE";
		}else if(windDeg >= 81 && windDeg <= 100){
			nameWind = "E";
		}else if(windDeg >= 101 && windDeg <= 170){
			nameWind = "SE";
		}else if( windDeg >= 171 && windDeg <= 190){
			nameWind = "S";
		}else if( windDeg >= 191 && windDeg <= 260){
			nameWind = "SW";
		}else if( windDeg >= 261 && windDeg <= 280){
			nameWind = "W";
		}else if( windDeg >= 281 && windDeg <= 350){
			nameWind = "NW";
		}else if( windDeg >= 351 && windDeg <= 360){
			nameWind = "N";
		}
		return nameWind;
	}

	render(){

		if(this.state.weatherObj){
			let weekDay = this.onGetWeekDay(this.state.date),
				icon = "./icons/" + this.state.weatherObj.list[0].weather[0].icon + ".png",
				singleWind = this.state.weatherObj.list[0].wind.speed,
				windDeg = this.state.weatherObj.list[0].wind.deg,
				nameWind = this.getDirectionWind(windDeg);
			return(
				<div className = "wethForOneDay">
					<h3>{this.state.weatherObj.city.name}</h3>
						<div className = "singleDate">
							<p>{weekDay}</p>
							<p>{this.state.date.substr(0, this.state.date.length-8 + "." )}</p>
						</div>
					<p className = "singleTemp">Current temp is: {Math.round(this.state.weatherObj.list[0].main.temp - 273.3)+ "ºc."}</p>
					<p className = "singleWind">Wind: {singleWind} m/s.</p>
					<p className = "singleNameWind">Direction of the wind: {nameWind}</p>
					<p className = "singleIcon"><img src = {icon}/></p>
				</div>
			)
		}else{
			return(
				<div><img className = "load" src = "./icons/Spinner.svg"/></div>
				)
		}
	}
}



