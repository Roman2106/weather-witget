export default {
	myGetWeth: function(url){
		return new Promise (function(resolve, reject){
			let request = new XMLHttpRequest();
			request.onload = () =>{
				resolve(request.response);
			}
			request.onerror = () =>{reject(console.log(hellow))};
			request.open("GET", url, true);
			request.responseType = "json";
			request.send();
		});
	}
}