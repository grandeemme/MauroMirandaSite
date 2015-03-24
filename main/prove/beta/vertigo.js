/*
Vertigo copiright by Mauro Miranda
 */
function Vertigo(itemJson) {
	this.document = document;
	this.element = $('#vertigo');
	var menuItem = new MenuItem(itemJson);
	menuItem.paint(this.element);
}; /*
Menu item rappresenta un singolo nodo del menu, ha un titolo e del testo, e a sua volta può contenere dei menu item
*/
function MenuItem(jsonObj) {
	var menuItem = this;
	this.title = jsonObj.title;
	this.text = jsonObj.text;
	this.selected = jsonObj.selected;
	this.menuItems = new Array();
	this.menuParent = null; 
	this.el = null;
	/*disegna il nodo sull'elemento*/
	this.paint = function(element) {
		this.el = $('<ul />');
		var li = $('<li />');
		this.el.append(li);
		li.append('<h1>' + this.title + '</h1>');
		li.append('<p>' + this.text + '</p>');
		if (this.selected) {
			this.el.addClass('selected');
		} /* l'onclick*/
		li.click(function(event) {
			menuItem.click(event);
		});
		element.append(this.el);
		$.each(this.menuItems, function(index, item) {
			var tmp = $('<li />');
			menuItem.el.append(tmp);
			item.paint(tmp);
		});
	}; /*
	*Aggiunge un menu item
	*/
	this.addMenuItem = function(item) {
		this.menuItems.push(item);
		item.menuParent = this;
	};
	this.click = function(){
		if(this.menuParent){
			this.menuParent.el.removeClass('selected');
			this.el.addClass('selected');
		}
	
	}; /*aggiungo i vari item presi dal json*/
	$.each(jsonObj.items, function(index, value) {
		var tmp = new MenuItem(value);
		menuItem.addMenuItem(tmp);
	});
};

function init() { /*
$.getJSON('menuitems.json',  function(data) {
		var obj = new Vertigo(data);
	});
*/
	$.ajax({
		cache: false,
		dataType: 'json',
		success: function(data) {
			var obj = new Vertigo(data);
		},
		url: 'menuitems.json'
	});
	return true;
}
