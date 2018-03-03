var EDIT_V = {};
var EDIT = {};

EDIT_V.init = function(){
	// Initialize property
	this.height = TABLE_V.height;

	// Setup add cells at footer
	this.makeFooter();

	// Setup body input cells
	_.each(TABLE_V.body, e => e.click(EDIT_I.handler.input_start).bind("blur", EDIT_I.handler.input_end));

	// Setup delete button
	_.each(TABLE_V.remove, e => e.text("X").click(EDIT_I.handler.remove));

};

EDIT_V.makeFooter = function(){
	TABLE_V.makeRow(DOM("tfoot"), TABLE_V.width,
		// data_callback
		(col, ele) => {
			ele.id("add_"+i)
			   .click(EDIT_I.handler.input_start)
			   .bind("blur", EDIT_I.handler.input_end);
		},
		// sidebar_callback
		ele => {
			ele.cls("pad")
			   .text("Add")
			   .id("add_btn")
			   .click(EDIT_I.handler.add);
		}
	);
};

EDIT_V.addRow = function(data){
	var row = this.height;
	this.height++;

	TABLE_V.makeRow(DOM("tbody"), TABLE_V.width,
		// data_callback
		(col, ele) => {
			ele.id("bd_"+row+"_"+col)
			   .click(EDIT_I.handler.input_start)
			   .bind("blur", EDIT_I.handler.input_end)
			   .text(data[col]);
		},
		// sidebar_callback
		ele => {
			ele.text("X")
			   .cls("remove")
			   .id("rm_"+row)
			   .click(EDIT_I.handler.remove);
		}
	);

	for (i=0; i<TABLE_V.width; i++){
		DOM("add_"+i).text("");
	}

	return row;
};