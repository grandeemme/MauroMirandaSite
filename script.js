
document.onmousemove = mouseMove;
document.onmouseup = mouseUp;
var dragObject     = null;
var mouseOffset = null;
var lastObject=null;

function mouseMove(ev){
	ev           = ev || window.event;
	var mousePos = mouseCoords(ev);
}

function mouseCoords(ev){
	if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
}

function makeClickable(object){
	object.onmousedown = function(){
		dragObject = this;
		this.style.zIndex=10;
	}
}

function mouseUp(ev){
	lastObject=dragObject;
	dragObject = null;
}

function getMouseOffset(target, ev){
	ev = ev || window.event;

	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top  = 0;

	while (e.offsetParent){
		left += e.offsetLeft;
		top  += e.offsetTop;
		e     = e.offsetParent;
	}

	left += e.offsetLeft;
	top  += e.offsetTop;

	return {x:left, y:top};
}
/** Ottiene la posizione del puntatore del mouse quando si muove*/
function mouseMove(ev){
	ev           = ev || window.event;
	var mousePos = mouseCoords(ev);

	if(dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top      = mousePos.y - mouseOffset.y +"px";
		dragObject.style.left     = mousePos.x - mouseOffset.x +"px";

		return false;
	}
}

function makeDraggable(item){
	
	item.onmousedown = function(ev){
		dragObject  = this;
		if(lastObject) lastObject.style.zIndex=1;
		this.style.zIndex=10;
		mouseOffset = getMouseOffset(this, ev);
		return false;
	}
}

function dragItem(id){
	makeDraggable(document.getElementById(id));

}