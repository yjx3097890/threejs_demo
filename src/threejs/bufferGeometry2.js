import {
  BufferAttribute,
  BufferGeometry, Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';


const scene = new Scene();
const camera = new PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 1, 1000);
camera.position.z = 100;
camera.lookAt(0, 0, 0);

const geometry = new BufferGeometry();

const vertices = new Float32Array([
  -1.0, -1.0,  1.0,
  1.0, -1.0,  1.0,
  1.0,  1.0,  1.0,

  1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0, -1.0,  1.0
]);
const itemSize = 3  // because there are 3 values (components) per vertex

geometry.setAttribute('position', new BufferAttribute(vertices, itemSize));
const material = new MeshBasicMaterial({
  color: 0xff00ff,
});
const mesh = new Mesh(geometry, material);
mesh.scale.addScalar(10);
scene.add(mesh);


const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth/3, window.innerHeight/3);
document.body.appendChild(renderer.domElement);

(function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
})()
