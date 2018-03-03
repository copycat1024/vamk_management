var TABLE_C = {};

TABLE_C.init = url => {
	return REST.get(url)
	.then(data => TABLE_M._init(data));
};

TABLE_C.showTable = name => {
	var t = DOM("top").clear();
	t.add("button").text("Back").click(MAIN.showList);
	t.add("button").text("Edit").click(MAIN.enableEdit);

	if (TABLE_M[name].loaded){
		TABLE_V.show(TABLE_M[name]);
	} else {
		TABLE_C.loadTable(name)
		.then(name => TABLE_V.show(TABLE_M[name]));
	}
}

TABLE_C.refreshTable = () => {
	var name = TABLE_V.name;
	REST.get(TABLE_M[name].url)
	.then(data => TABLE_M[name].loadData(data))
	.then(data => TABLE_C.showTable(name));
}

TABLE_C.loadTable = name => {
	var q = new RESTQ();
	q.add("meta", REST.options(TABLE_M[name].url));
	q.add("data", REST.get(TABLE_M[name].url));
	return q.run().then(result => TABLE_M[name].load(result))
}