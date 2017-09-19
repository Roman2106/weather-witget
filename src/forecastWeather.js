import React from "react";
import MyStore from "./store";
import Actions from "./actions";
import Reflux from "reflux";

export default class ForecastWeather extends Reflux.Component{
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
			let oneDay = this.state.weatherObj.list.map( (item, index) =>{
				if(!(index%8)){
					let weekDay = this.onGetWeekDay(item.dt_txt),
						icon = "./icons/" + item.weather[0].icon + ".png",
						wind = item.wind.speed,
						windDeg = item.wind.deg,
						nameWind = this.getDirectionWind(windDeg);
					return(
						<div className = "forecastWeather" key = {index}>
							<div className = "header">
								<p className = "weekDay">{weekDay}</p>
								<p className = "dt">{item.dt_txt.substr(0, item.dt_txt.length-8 + "." )}</p>
							</div>
							<div className = "body">
								<p className = "temp">Temp: {Math.round(item.main.temp - 273.3)+ "ºc."}</p>
								<p className = "icon"><img src = {icon}/></p>
							</div>
							<div className = "wind">
								<p>Wind: {wind} m/s.</p>
								<p className = "singleNameWind">Direction of the wind: {nameWind}</p>
							</div>
						</div>
					)
				}	
			})
			return(
				<div>{oneDay}</div>
			)
		}else{
			return(
				<div><img src = "./icons/Spinner.svg"/></div>
				)
		}
	}
}