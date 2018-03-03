var EDIT_C = {};

EDIT_C.enable = () => {
	var t = DOM("top").clear();
	t.add("button").text("Save").click(EDIT_C.save);
	t.add("button").text("Cancel").click(EDIT_C.cancel);

	EDIT_M.init();
	EDIT_V.init();
}

EDIT_C.cancel = () => {
	MAIN.showTable(TABLE_V.name);
};

EDIT_C.save = () => {
	EDIT_R.init();
	EDIT_R.send(EDIT_M.reduce());
}
