import * as THREE from './three.js/build/three.module.js'
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import Stats from './three.js/examples/jsm/libs/stats.module.js'
import * as dat from './three.js/examples/jsm/libs/dat.gui.module.js'

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

//Background
scene.background = new THREE.Color(0x333333)

//Directional Light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(5, 5, 5)
scene.add(light)

// Objects
//Función para generar la altura aleatoria
const random = (min, max, float = false) => {
    const value = Math.random() * (max - min) + min
  
    if (float) {
      return value
    }
  
    return Math.floor(value)
  }

  

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 50
camera.position.z = 50
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Plano
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1), 
    new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane)

//OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

//Stats
const stats = new Stats();
const createStats = function(){
    stats.setMode(2);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "100px";
    stats.domElement.style.top = "0px";
    document.getElementById("Mystats").appendChild(stats.domElement);
    return stats;
}

//Color aleatorio
function letrasHexa(){
    var letras = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var numero = (Math.random()*15).toFixed(0);
    return letras[numero];
}

function colorHexa(){
    var col = "";
    for(var i=0; i<6; i++){
        col = col + letrasHexa();
    }
    return "#" + col;
}

//ManageControl
const manageControls = new function(){
    this.addBuilding = ()=>{
        const geometry = new THREE.BoxGeometry( 1, random(1, 50, false), 1 );
        const material = new THREE.MeshPhongMaterial( {color: colorHexa()} );
        const cube = new THREE.Mesh( geometry, material );
        cube.position.x = random(-50, 50, false);
        cube.position.z = random(-50, 50, false);
        scene.add( cube );
    }
}

//Niebla
scene.fog = new THREE.Fog(0xffffff, 10, 100);

//GUI
const createDataGui = function() {
    const gui = new dat.GUI();
    gui.add(manageControls, "addBuilding");
}

//Animate
 const animate= function() {
	requestAnimationFrame( animate );
    
    stats.update();
	renderer.render( scene, camera );
}
animate();
createDataGui();
createStats();