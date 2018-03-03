MAIN = {
	"url"    : "http://localhost:8000/",
};

MAIN.init = () => 
	TABLE_C.init(MAIN.url)
	.then(MAIN.showList);


MAIN.showList = function(){
	DOM("top").clear();

	DOM("main").clear();
	DOM("main").add("p").text("Table list:");

	_.each(TABLE_M._list, k => 
		DOM("main").add("li").text(up1(k)).click(e =>
			MAIN.showTable(k)
		)
	);
}

MAIN.showTable = function(k){
	TABLE_C.showTable(k);
}

MAIN.enableEdit = function(){
	EDIT_C.enable();
}

window.onload = () => MAIN.init();

