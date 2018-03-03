var TABLE_V = {};

TABLE_V.show = function(table){
	// set the name of the table currently being view
	this.name   = table.name;
	this.width  = table.getWidth();
	this.height = table.getHeight();

	// create the table template :
	// table
	// -- thead#thead
	// -- tbody#tbody
	// -- tfoot#tfoot
	var t = DOM("main").clear().add("table");
	_.each(["thead", "tbody", "tfoot"], s => t.add(s).id(s));

	// populate data in the table template
	this.makeHeader(table);
	this.makeBody(table);
}

TABLE_V.makeHeader = function(table){
	var header = [];

	this.makeRow(DOM("thead"), this.width,
		// data_callback
		(col, ele) => {
			ele.text(table.getMeta(col).label)
			   .id("hd_"+col)
			   .cls("head");
			header.push(ele);
		},
		// sidebar_callback
		ele => {
			ele.cls("pad");
		}
	);

	this.header = header;
}

TABLE_V.makeBody = function(table){
	var body   = [];
	var remove = [];
	var data   = table.data;
	var row    = 0;

	for (row=0; row<data.length; row++){
		this.makeRow(DOM("tbody"), this.width,
			// data_callback
			(col, ele) => {
				ele.text(data[row][col])
				   .id("bd_"+row+"_"+col)
				   .cls("data");
				body.push(ele);
			},
			// sidebar_callback
			ele => {
				ele.cls("remove")
				   .id("rm_"+row);
				remove.push(ele);
			}
		);
	}

	this.body   = body;
	this.remove = remove;
}

// data_callback take two arguments: collumn index and element
// sidebar_callback take one arguments: element
TABLE_V.makeRow = (container, width, data_callback, sidebar_callback) => {
	var row = container.add("tr");
	for (i=0; i<width; i++){
		data_callback(i, row.add("td"));
	}
	sidebar_callback(row.add("td"));
}