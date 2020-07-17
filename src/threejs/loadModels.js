import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  AmbientLight,
  AnimationMixer, Clock,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';
import House from 'Three/assets/LittlestTokyo.glb';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const clock = new Clock();
let mixer;

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 100;
camera.lookAt(0,0,0);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth/3, window.innerHeight/3);
document.body.append(renderer.domElement);

const dirLight = new DirectionalLight( 0xffffff, 1 );
dirLight.position.set( 5, 2, 8 );
scene.add( dirLight );

const light = new AmbientLight(0x404040);
scene.add(light);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'libs/draco/gltf/' );
const loader = new GLTFLoader();
loader.setDRACOLoader( dracoLoader );
loader.load(House, (gltf) => {
  const model = gltf.scene;
  model.position.set( 1, 1, 0 );
  model.scale.set( 0.1, 0.1, 0.1 );
  scene.add( model );
  mixer = new AnimationMixer( model );
  mixer.clipAction( gltf.animations[ 0 ] ).play();

  animate(model);
}, ( xhr ) => {
  // called while loading is progressing
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  }, (error) => {
  console.error(error);
});

function animate(model) {
  model.rotation.y += 0.01;

  const delta = clock.getDelta();
  mixer.update( delta );

  renderer.render(scene, camera);
  requestAnimationFrame(animate.bind(window, model));
}
