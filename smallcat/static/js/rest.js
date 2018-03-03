/* --- Sample use
requestREST("GET", "/course", {}, function(request){
	alert(request.responseText);
});
*/

REST = {};

REST.request = (method, url, data) => promiseREST(method, url, data);
REST.get     = (url)               => promiseREST("GET", url, {});
REST.options = (url)               => promiseREST("OPTIONS", url, {});
REST.add     = (url, data)         => promiseREST("POST", url, data);
REST.remove  = (url)               => promiseREST("DELETE", url, {});
REST.edit    = (url, data)         => promiseREST("PUT", url, data);

REST.handleError = xhr => {
	console.log("REST error!")
	console.log(xhr.responseText);
};

function promiseREST(method, url, data){
	var xhr = new XMLHttpRequest();
	return new Promise( (resolve, reject) => {
		xhr.open(method, url, true);
		xhr.setRequestHeader("X-CSRFToken", readCookie("csrftoken"));
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.onload = function(){
			if (this.status >= 200 && this.status < 300) {
				if (this.responseText){
					resolve(JSON.parse(this.responseText));
				} else {
					resolve({});
				}
			} else {
				reject(this);
			}
		};
		xhr.onerror = function(){
			reject(this);
		};
		xhr.send(JSON.stringify(data));
	}).catch(xhr => {
		REST.handleError(xhr);
	});
}

function requestREST(method, url, data, callback){
	var request = new XMLHttpRequest();
	request.open(method, url, true);
	request.setRequestHeader("X-CSRFToken", readCookie("csrftoken"));
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onreadystatechange = function(){
		if (request.readyState === XMLHttpRequest.DONE){
			callback(request);
		}
	};
	request.send(JSON.stringify(data));
}

function readCookie(name) {
	var nameEQ = encodeURIComponent(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}