var camera, scene, renderer, geometry, material, mesh, pointLight;

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 300;
	scene.add(camera);
	geometry = new THREE.CubeGeometry(200, 200, 200);
	material = new THREE.MeshLambertMaterial({
		color: 0xff0000,
		wireframe: true 
	});
	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	var radius = 50,
		segments = 16,
		rings = 16; // create a new mesh with sphere geometry -
	// we will cover the sphereMaterial next!
	var sphereMaterial = new THREE.MeshLambertMaterial({
		color: 0xCC0000
	});
	var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial); // add the sphere to the scene
	scene.add(sphere); // create a point light
	pointLight = new THREE.PointLight(0xFFFFFF); // set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130; // add to the scene
	scene.add(pointLight);
/*
	var text = new THREE.Mesh(new THREE.TextGeometry("Mauro", {
		size: 80,
		height: 80,
		curveSegments: 6,
		font: "helvetiker",
		weighht: "bold",
		style: "normal"
	}), new THREE.MeshLambertMaterial({
		color: 0xff0000
	}));
	
	text.position.x = -150;
	
	scene.add(text);
*/
	document.body.appendChild(renderer.domElement);
}
function animate() { // note: three.js includes requestAnimationFrame shim
	requestAnimationFrame(animate);
	render();
}
function render() {

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render(scene, camera);
}
function start() {
	init();
	animate();
	$(renderer.domElement).mousemove(function(event) {
		var zeroX = $(renderer.domElement).width() /2;
		var zeroY = $(renderer.domElement).height() /2;
		
		var posX =  event.clientX - zeroX;
		var posY =  event.clientY - zeroY;
	
	
		var zoom = event.clientX / window.innerWidth; //camera.position.z = 1000 * zoom;
		pointLight.position.x = posX;
		pointLight.position.y = -posY;
	}).css({
		"width": "100%",
		"height": "100%",
		"min-height": "100%"
	});
}
