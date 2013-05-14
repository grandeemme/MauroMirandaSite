var divs;
var count = 0;
var MAX_CLASS = 3;

function init() {
	divs = $("div.frame0");
	step(0, 0);
}

function step(iEl, iClass) { /*Avvio l'animazione sull'elemento i-esimo*/
	var el = $(divs[iEl]);
	if (el && iClass < MAX_CLASS) {
		el.on('webkitTransitionEnd  transitionend oTransitionEnd', function(event) { //
			/*tolgo l'handler perché l'evento transitionend viene lanciato per ogni proprietà css che è stata modificata*/
			$(event.target).off('webkitTransitionEnd  transitionend oTransitionEnd');
			var iClass = parseInt(event.target.className.split('frame')[1]);
			window.setTimeout("step(" + iEl + "," +iClass + ")", 1);
			if (iClass == 1) {
				step(iEl + 1, iClass - 1);
			}
		});
		el.removeClass('frame' + iClass);
		el.addClass('frame' + (iClass + 1));
	}
	//l'ultimo avvia il menu
	if(iEl == divs.length - 1 && iClass == MAX_CLASS){
		var menu = $('div.hidden:first');
		
		menu.removeClass('hidden');
		menu.addClass('menuSelected');
	}
	
}
