function RESTQ(){
	this._queue = {};

	this.add = (name, promise) => {
		this._queue[name] = promise;
	}

	this.run = () => new Promise((resolve, reject) => {
		var keys = Object.keys(this._queue);
		var size = keys.length;
		var count = 0;
		var result = {};
		keys.forEach(k => {
			this._queue[k].then(data => {
				result[k] = data;
				count++;
				if (count == size) resolve(result);
			})
		});
	});
}