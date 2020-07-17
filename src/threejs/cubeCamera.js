import { Scene, WebGLRenderer } from 'three';

const scene = new Scene();


const renderer = new WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth/3, window.innerHeight/3);
document.body.appendChild(renderer.domElement);


(function animate() {
  requestAnimationFrame(animate);
  renderer.render();
})();
