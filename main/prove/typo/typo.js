var browser = "";
var scene;
if ($.browser.webkit) {
	browser = "-webkit-";
} else if ($.browser.mozilla) {
	browser = "-moz-";
} else if ($.browser.opera) {
	browser = "-o-";
}
function getTransform(el, invert) {
	var translateX = (invert ? -1 : 1) * (el.dataset.translateX || 0);
	var translateY = (invert ? -1 : 1) * (el.dataset.translateY || 0);
	var translateZ = (invert ? -1 : 1) * (el.dataset.translateZ || 0);
	var rotateX = (invert ? -1 : 1) * (el.dataset.rotateX || 0);
	var rotateY = (invert ? -1 : 1) * (el.dataset.rotateY || 0);
	var rotateZ = (invert ? -1 : 1) * (el.dataset.rotateZ || 0);
	var transform = {
		translateX: translateX,
		translateY: translateY,
		translateZ: translateZ,
		rotateX: rotateX,
		rotateY: rotateY,
		rotateZ: rotateZ
	};
	return transform;
}
function getCss(el, invert) {
	var transform = getTransform(el, invert);
	var rotate = "rotateX(" + transform.rotateX + "deg) rotateY(" + transform.rotateY + "deg) rotateZ(" + transform.rotateZ + "deg)";
	var translate = "translate(-50%,-50%) translate3d(" + transform.translateX + "px, " + transform.translateY + "px," + transform.translateZ + "px) ";
	var css = {};
	css[browser + "transform"] = translate + rotate;
	css['position'] = 'absolute';
	css[browser + "transform-style"] = "preserve-3d";
	return css;
}
var requestAnimationFrame = function(callback) {
	setTimeout(callback, 50);
};

function safariWorkaround(el) {
	var clone = $(el).clone(true);
	var transform = {
		translateX: 0,
		translateY: 0,
		translateZ: 0,
		rotateX: 0,
		rotateY: 0,
		rotateZ: 0
	};
	var rotate = " rotateZ(" + transform.rotateZ + "deg) rotateY(" + transform.rotateY + "deg) rotateX(" + transform.rotateX + "deg)";
	var translate = " translate(-50%,-50%) translate3d(" + transform.translateX + "px, " + transform.translateY + "px," + transform.translateZ + "px) ";
	var css = {};
	css[browser + "transform"] = rotate + translate;
	css[browser + "transition"] = "all 1s ease-out";
	css[browser + "transform-style"] = "preserve-3d";
	clone.css(css);
	scene.parent().prepend(clone);
}
function AnimatedEl(el) {
	var element = el;
	var time = Date.now();
	var count = 0;
	var text = '';
	var child;
	var step = function(timestamp) {
		timestamp = timestamp || Date.now();
		var progress = timestamp - time;
		count++;
		child.text(text.substr(0, count));
		if (count < text.length) {
			requestAnimationFrame(step);
		}
	};
	var start = function() {
		requestAnimationFrame(step);
	}; //se l'elemento ha un effetto
	if (element.dataset.effect) {
		if (element.dataset.effect == 'type') {
			child = $(element).find('div.list>div[class!="link"]');
			text = child.text();
			child.text('');
		}
		start();
	};
};

function goTo(elId) {
	var css = {};
	if (elId != "#home") { //disabilito il css per l'animazione	
		css[browser + "transition"] = "none";
		scene.css(css);
		var newID = elId.split('#')[1];
		$('.move').each(function(index, value) {
			var myObject = eval('(' + value.dataset.translateZArray + ')');
			var zIndex = myObject[newID];
			var transform = getTransform(value, false);
			var rotate = "rotateX(" + transform.rotateX + "deg) rotateY(" + transform.rotateY + "deg) rotateZ(" + transform.rotateZ + "deg)";
			var translate = "translate(-50%,-50%) translate3d(" + transform.translateX + "px, " + transform.translateY + "px," + zIndex + "px) ";
			var css2 = {};
			css2[browser + "transform"] = translate + rotate;
			css2['position'] = 'absolute';
			css2[browser + "transform-style"] = "preserve-3d";
			$(value).css(css2);
		});
	}
	scene.parent().children('div.menu').remove();
	var el = $('.menu[id="' + elId + '"]')[0];
	var transform = getTransform(el, true);
	var rotate = " rotateZ(" + transform.rotateZ + "deg) rotateY(" + transform.rotateY + "deg) rotateX(" + transform.rotateX + "deg)";
	var translate = " translate3d(" + transform.translateX + "px, " + transform.translateY + "px," + transform.translateZ + "px) ";
	css[browser + "transform"] = rotate + translate;
	css[browser + "transition"] = "all 1s ease-out";
	css[browser + "transform-style"] = "preserve-3d";
	scene.on('webkitTransitionEnd  transitionend oTransitionEnd', function(event) { //
		/*tolgo l'handler perché l'evento transitionend viene lanciato per ogni proprietà css che è stata modificata*/
		$(event.target).off('webkitTransitionEnd  transitionend oTransitionEnd');
		safariWorkaround(el);
	});
	scene.css(css);
}
var Typo = new Object({
	init: function() {
		scene = $('#scene');
		$('.menu').each(function(index, value) {
			$(this).css(getCss(value, false));
			var child = $(value).find('div.list>div[class!="link"]');
			var text = child.text();
			var newHtml = "";
			$.each(text.split(' '), function(index, value) {
				if(value){
					var zIndex = Math.floor(Math.random()*100);
					newHtml += '<span style="display:inline-block;' + browser + "transform" + ': translate3D(0,0,' + zIndex + 'px);">' + value + '</span>&nbsp;';
				}
			});
			child.html(newHtml);
			
		});
		$('a[href]').each(function(index, value) {
			if (value.hash == '#home') {
				$(this).click(function(ev) {
					window.history.back();
					return false;
				});
			}
		});
		return true;
	},
});
window.onpopstate = function(event) {
	var id = document.location.hash;
	id = id || '#home';
	goTo(id);
};
