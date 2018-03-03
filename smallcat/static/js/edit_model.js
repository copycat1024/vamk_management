var EDIT_M = {};

EDIT_M.init = function(){
	this.queue = [];
}

EDIT_M.edit = function(id, old_txt, new_txt){
	this.queue.push({
		"type" : "edit",
		"id"   : id,
		"old"  : old_txt,
		"new"  : new_txt,
	});
}

EDIT_M.remove = function(id){
	this.queue.push({
		"type" : "remove",
		"id"   : id,
	});
}

EDIT_M.add = function(row){
	this.queue.push({
		"type" : "add",
		"row"  : row,
	});
}

EDIT_M.reduce = function(){
	var parse = (s, i) => s.split("_")[i];
	var d = {};

	_.each(this.queue, q => {
		if (q.id){
			q.row = parse(q.id, 1);
		}
	});

	_.each(this.queue, q => {
		if (d[q.row] == null){
			if (q.type == "edit" && parse(q.id, 0) == "add") return 0;
			d[q.row] = q.type;
		} else if (q.type == "add") {
			let org = d[q.row];
			d[q.row] = "add";
			if (org == "remove-edit") d[q.row] = "edit";
			if (org == "remove") d[q.row] = "edit";
		} else if (q.type == "remove") {
			if (d[q.row] == "add")  d[q.row] = "remove-add";
			if (d[q.row] == "edit") d[q.row] = "remove-edit";
		}
	});
	return d;
}