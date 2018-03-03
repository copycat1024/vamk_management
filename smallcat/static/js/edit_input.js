var EDIT_I = {
	"handler":{},
};

EDIT_I.init = function(){
	this.last = "";
}

// handlers
EDIT_I.handler.input_start = e => {
	EDIT_I.last = e.text();
	e.editable(true).focus();
};

EDIT_I.handler.input_end = e => {
	e.editable(false);
	if (EDIT_I.last != e.text()){
		EDIT_M.edit(e.id(), EDIT_I.last, e.text());
	}
}

EDIT_I.handler.add = e => {
	clean = str => str.substring(str.length - 4) == "<br>" ? str.substring(0, str.length - 4) : str;

	if (false){
		alert("Empty primary key.");
	} else {
		let data = [];
		for (i=0; i<TABLE_V.width; i++){
			dw(clean(DOM("add_"+i).text()));
			data.push(clean(DOM("add_"+i).text()));
		}
		let row = EDIT_V.addRow(data);
		EDIT_M.add(row);
	}
};

EDIT_I.handler.remove = e => {
	EDIT_M.remove(e.id());
	e.parent().remove();
};