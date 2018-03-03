var _DOM = {"ele" : {}};

// DOM Element

function DOM(id){
	function Element(input_node){
		this.node = input_node;
		var node = this.node;

		this.prop  = function(name, value){
			if (value === undefined){
				return node[name];
			} else {
				node[name] = value;
				return this;
			}
		};

		this.text = function(txt){
			return this.prop("innerHTML", txt);
		};

		this.id = function(id){
			return this.prop("id", id);
		};

		this.editable = function(flag){
			return this.prop("contentEditable", flag);
		};

		this.attr = function(name, value){
			if (value === undefined){
				return node.getAttribute(name);
			} else {
				node.setAttribute(name, value);
				return this;
			}
		};

		this.cls  = function(value){
			return this.attr("class", value);
		};

		this.bind = function(type, listener){
			var handler = e => listener(this, e);
			node.addEventListener(type, handler, false);
			return this;
		};

		this.click = function(listener){
			return this.bind("click", listener);
		};

		this.clear = function(){
			var clone = node.cloneNode(false);
			node.parentNode.replaceChild(clone, node);
			return new Element(clone);
		};

		this.add  = function(tag){
			var child = document.createElement(tag);
			node.appendChild(child);
			return new Element(child);
		};

		this.parent = function(){
			return new Element(node.parentNode);
		}

		this.focus = function(){
			node.focus();
			return this;
		}

		this.remove = function(){
			node.parentNode.removeChild(node);
			return null;
		}
	}

	var getElementByID = id => new Element(document.getElementById(id));

	if (DOM.cache == null) DOM.cache = {};
	if (DOM.cache[id] == null || DOM.cache[id].offsetParent == null){
		DOM.cache[id] = getElementByID(id);
	} else {
		alert("Cached "+id);
	}
	return DOM.cache[id];
}