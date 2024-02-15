import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import  * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});



renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);



const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );

const torus = new THREE.Mesh( geometry, material );



scene.add(torus);


const pointlight = new THREE.PointLight(0xFFFFFF, 1000, 0, 2.5);
const pointlight2 = new THREE.PointLight(0xFFFFFF, 1000, 0, 2.5);
pointlight.position.set(-10, 5, -10);
scene.add(pointlight);
pointlight2.position.set(10, 5, 10);
scene.add(pointlight2);


const ambientlight = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(ambientlight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
  const star = new THREE.Mesh( geometry, material );
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
  star.position.set(x, y, z)
  scene.add(star);
}

Array(200).fill().forEach(addStar)

const controls = new OrbitControls(camera, renderer.domElement);

function animate() { 
  requestAnimationFrame( animate );

  torus.rotation.x += .001
  torus.rotation.y += .005
  torus.rotation.z += .0025

  renderer.render( scene, camera );
}

animate();
