// extract key from url
function ekfu(str){
	if (str.slice(0,4)=="http"){
		var l = str.split("/");
		return l[l.length-2];
	}
	return str;
}

// extract from id
function efid(id){
	var l = id.split("_");
	return {"field":l[1],"pk":l[2]};
}

// uppercase first char
function up1(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// debug write
function dw(data){
	console.log(JSON.stringify(data));
}