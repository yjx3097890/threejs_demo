import {
    BufferGeometry, Line,
    LineBasicMaterial,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer
} from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth/3, window.innerHeight/3);
document.body.appendChild(renderer.domElement);

const material = new LineBasicMaterial({color: 0x0000ff});

const points = [];
points.push(new Vector3(-10, 0,0));
points.push(new Vector3(0, 10,0));
points.push(new Vector3(10, 0,0));
const geometry = new BufferGeometry().setFromPoints(points);

const line = new Line(geometry, material);
scene.add(line);

(function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    line.rotation.y += 0.01;
})();

