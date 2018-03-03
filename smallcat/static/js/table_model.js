TABLE_M = {};

TABLE_M._init = function(data){
	function Table(name, url){
		this.name = name;
		this.url = url;
		this.loaded = false;

		this.load = function(result){
			this.loadMeta(result.meta.table);
			this.loadData(result.data);
			this.loaded = true;
			return this.name;
		}

		this.loadMeta = function(meta){
			this.meta = meta;
			this.meta.cols = [];
			_.map(meta.fields, (f, k) => {
				this.meta.cols.push(k);
			});
		}

		// Must have load metadata before calling this function
		this.loadData = function(data){
			this.data = [];
			this.pk   = [];
			
			_.each(data, row => {
				r = [];
				_.each(this.meta.cols, col =>
					r.push(row[col])
				)
				this.data.push(r);
				this.pk.push(row[this.meta.pk]);
			});
		}

		// return collumn name based on index
		this.getCollumn = function(index){
			return this.meta.cols[index];
		}

		// return collumn metadata based on index
		this.getMeta = function(index){
			return this.meta.fields[this.getCollumn(index)];
		}

		// return the number of collumns in the table
		this.getWidth = function(){
			return this.meta.cols.length;
		}

		this.getHeight = function(){
			return this.data.length;
		}

		// return if a field is primary key based on index
		this.isPrimary = function(index){
			return this.getCollumn(index) == this.meta.pk;
		}

		// return if a field is relation key based on index
		this.isRelation = function(index){
			col = this.getCollumn(index);
			return this.fields[col].type == "field";
		}
	}

	this._list = [];
	_.map(data, (url, name) => {
		this._list.push(name);
		this[name] = new Table(name, url);
	});
}