var scene;
var distance = 600;
var width;

function init() {
	width = $('body').width();
	scene = $('#scene');
	scene.mousemove(function(event) {
		var sin = event.clientX - width/2;
		
		var ipotenusa = Math.pow(sin, 2) + Math.pow(distance, 2);
		
		var angle = Math.asin(  sin/ipotenusa);
		scene.css({
			"-webkit-transform": "rotate("+angle + ");"
		});
		
		$('#scene div').html( "X "+event.clientX + " sin" + sin + " angolo" + angle);
	});
	return true;
};
