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
	setTimeout(callback, 1000/60);
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

function calculateFace(el) {
	var face = el.dataset.face;
	var height = $(document).height();
	var width = $(document).width();
	$(el).css({
		width: width,
		height: height
	});
	var moveX = Math.floor(width / 2);
	var moveY = Math.floor(height / 2);
	el.dataset.translateX = (face == 2 ? -moveX : (face == 4 ? moveX : 0));
	el.dataset.translateY = (face == 3 ? moveY : (face == 5 ? -moveY : 0));
	el.dataset.translateZ = (face == 2 || face == 4 ? -moveX : (face ==3 || face == 5 ? -moveY: 0));
	el.dataset.rotateX = (face == 3 ? -90 : (face == 5 ? 90 : 0));
	el.dataset.rotateY = (face == 2 ? -90 : (face == 4 ? 90 : 0));
	el.dataset.rotateZ = 0;
}
function goTo(elId) {
	var css = {};
	scene.parent().children('div.menu').remove();
	var el = $('.menu[id="' + elId + '"]')[0];
	var transform = getTransform(el, true);
	var rotate = " rotateZ(" + transform.rotateZ + "deg) rotateY(" + transform.rotateY + "deg) rotateX(" + transform.rotateX + "deg)";
	var translate = " translate3d(" + transform.translateX + "px, " + transform.translateY + "px," + transform.translateZ + "px) ";
	css[browser + "transform"] = rotate + translate;
	css[browser + "transition"] = "all 1s ease-out";
	css[browser + "transform-style"] = "preserve-3d";
	
	scene.off('webkitTransitionEnd  transitionend oTransitionEnd');
	scene.on('webkitTransitionEnd  transitionend oTransitionEnd', function(event) { //
		/*tolgo l'handler perché l'evento transitionend viene lanciato per ogni proprietà css che è stata modificata*/
		$(event.target).off('webkitTransitionEnd  transitionend oTransitionEnd');
		if ($.browser.safari) {
			safariWorkaround(el);
		}
	});
	scene.css(css);
}
var Typo = new Object({
	init: function() {
		scene = $('#scene');
		$('.menu').each(function(index, value) {
			calculateFace(value);
			$(this).css(getCss(value, false));
		});
		$('a[href]').each(function(index, value) {
			if (value.hash == '#home') {
				$(this).click(function(ev) {
					window.history.back();
					return false;
				});
			}
		});
		scene.css({
			display: 'inherit'
		});
		css = {};
		css['opacity'] = 1;
		css[browser + "transition"] = "all 2s ease-out";
		scene.parent().css(css);
		return true;
	},
});
window.onpopstate = function(event) {
	var id = document.location.hash;
	id = id || '#home';
	goTo(id);
};

$(window).resize(function() {
  Typo.init();
});
