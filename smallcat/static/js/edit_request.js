var EDIT_R = {};

EDIT_R.init = function(){
	this.table = TABLE_M[TABLE_V.name];
}

EDIT_R.send = queue => {
	var url = EDIT_R.table.url;
	var q = new RESTQ();
	_.map(queue, (value, row) => {
		if (value == "add"){
			q.add(row, EDIT_R.add(row, url));
		} else if (value == "remove" || value == "remove-edit") {
			q.add(row, EDIT_R.remove(row, url));			
		} else if (value == "edit"){
			q.add(row, EDIT_R.edit(row, url));
		} else {
			dw(value);
		}
	});
	q.run()
	.then(d => dw(d))
	.then(d => TABLE_C.refreshTable());
}

EDIT_R.add = (row, url) => {
	return REST.add(url, EDIT_R.serialize(row));
}

EDIT_R.remove = (row, url) => {
	return REST.remove(url+EDIT_R.getPk(row)+"/");
}

EDIT_R.edit = (row, url) => {
	var data = EDIT_R.serialize(row);
	var old_pk = EDIT_R.getPk(row);
	var new_pk = data[EDIT_R.table.meta.pk];
	if (old_pk == new_pk){
		return REST.edit(url+old_pk+"/", EDIT_R.serialize(row));
	} else {
		return REST.add(url, EDIT_R.serialize(row))
		.then(() => REST.remove(url+old_pk+"/"));
	}
}

EDIT_R.serialize = row => {
	var cols = EDIT_R.table.meta.cols;
	var r = {};
	var col = 0;
	for (col = 0; col<cols.length; col++){
		var cell = DOM("bd_"+row+"_"+col);
		r[cols[col]] = cell.text();
	}
	return r;
}

EDIT_R.getPk = row => EDIT_R.table.pk[row];