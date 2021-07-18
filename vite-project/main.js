import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);
camera.position.setX(-3);


renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(12,3,16,100);
const material = new THREE.MeshStandardMaterial({color:0xff6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Llums
const pointLight = new THREE.PointLight(
  0xffffff);
  pointLight.position.set(20,20,20);

const AmbientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,AmbientLight);

/*
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);
*/

const controls = new OrbitControls(camera, renderer.domElement);



// Creem estrelles simples en posicions aleatòries
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 25);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry,material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);


//Col·loquem una imatge de fons
const spaceTexture = new THREE.TextureLoader().load('space.jpeg',function(){  });
scene.background = spaceTexture;


//Creem un cub amb una imatge com a textura
const eduTexture = new THREE.TextureLoader().load('edu.jpg');
const edu = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,5),
  new THREE.MeshBasicMaterial({map:eduTexture})
);
scene.add(edu);
edu.position.setX(5);



// Insertem una lluna
const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('normal.jpeg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial( {
    map:moonTexture,
    normalMap: normalTexture
  } )
);
scene.add(moon);
moon.position.z = 30;
moon.position.setX(5); 

// moviment de la càmera en fer scroll

function moveCamera(){
  
 const t = document.body.getBoundingClientRect().top; 
 torus.rotation.x += 0.005;
 torus.rotation.y += 0.005;
 torus.rotation.z += 0.005; 


 edu.rotation.y += 0.005;
 edu.rotation.z += 0.001;
 edu.rotation.x += 0.001;

 
 camera.position.z = t * -0.005 + 10;
 camera.position.x = t * -0.0085 + (-3);
 camera.position.y = t * -0.0002;

// camera.rotation.z = t * 0.45;
 
 console.log(camera.position.z);
}

document.body.onscroll = moveCamera;


// Reprodueix animacions frame a frame
function animate(){
  requestAnimationFrame(animate); // like a "game loop"

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.01;

  moon.rotation.y += 0.005;

  controls.update();

  renderer.render(scene,camera);
}
animate();

// Reajusta la mida del canvas quan es canvii la mida del navegador.

window.addEventListener("resize", () =>{
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});
