import React from "react";
import CurrentWeather from "./currentWeather.js";
import ForecastWeather from "./forecastWeather.js";
import MyStore from "./store";
import Actions from "./actions";
import Reflux from "reflux";


export default class List extends Reflux.Component {
	constructor(props){
		super(props);
		this.state = {
			currentPage: 1,
			selLinckFirst: "selected",
			selLinckSecond: "linck"
		}
		this.store = MyStore;
	}

	showLinckFirst(){
		this.setState({
			selLinckFirst: "selected",
			selLinckSecond: "linck"
		})
	}

	showLinckSecond(){
		this.setState({
			selLinckFirst: "linck",
			selLinckSecond: "selected"
		})
	}

	getGeo(){
		return new Promise((resolve, reject)=>{
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(position =>{
					let long = position.coords.longitude,
						latt = position.coords.latitude;
						let myLocation = {
							lat: latt,
							lng: long
						};
						resolve(myLocation);
				}, 
					err =>{
						let errObj = {
							0: "Unkonown Error",
							1: "Premission denied by User",
							2: "Position is not available",
							3: "Request time out"
						}
							reject(console.log(`${err.code} ${errObj[err.code]}`),
							alert("Пожалуйста, перезагрузите страницу и разрешите приложению доступ к вашему местоположению, для определения погоды в вашем месте")
						);
					}
				);
			};
		});
	}

	firstPage(){
		return(
			<CurrentWeather/>
			)
	}

	secondPage(){
		return(
			<ForecastWeather/>
			)
	}

	render(){
		this.getGeo().then(coords =>{
			let weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" +coords.lat+ "&lon="+coords.lng+"&APPID=cb121ca5c4f3a6c7d0f9a83ba5da2eb0";
			this.setState({
				weatherUrl: weatherUrl
			});
			Actions.getWeather(weatherUrl);
		});
			let page = this.state.currentPage === 1 ? this.firstPage() : this.secondPage();
		return(
				<div className = "wrapperTwo">
					<div className = "app">
						<ul className = "nav">
							<li className = {this.state.selLinckFirst} onClick = {() => {this.setState({currentPage: 1}); this.showLinckFirst()}}>Current Weather</li>
							<li className = {this.state.selLinckSecond} onClick = {() => {this.setState({currentPage: 2}); this.showLinckSecond()}}>Weather for five days</li>
						</ul>
						{page}
					</div>
				</div>
		)
	}
}
