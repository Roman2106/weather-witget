import Reflux from "reflux";
import React from "react";
import Actions from "./actions";
import myFetch from "./myfetch.js";

export default class MyStore extends Reflux.Store{
	constructor(){
		super();
		this.state = {
			weatherObj: null,
			cityName: null,
			date: null,
			weekDay: null,
			weatherUrl: null,
			windDeg: null
		}
		this.listenables = Actions;
	}

	onGetWeather(weatherUrl){
		myFetch.myGetWeth(weatherUrl).then((result, onRejected) =>{
			this.setState({
				weatherObj: result,
				cityName: result.city.name,
				date: result.list[0].dt_txt
			});
		});
	}
}

