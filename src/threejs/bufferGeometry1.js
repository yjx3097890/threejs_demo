import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Camera, DirectionalLight, Line,
  LineBasicMaterial, PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 2000);
camera.position.z = 1000;
camera.lookAt(0, 0, 0);

const MAX_POINTS = 500;
let drawCount = 0;

// geometry
const geometry = new BufferGeometry();

// attributes
const positions = new Float32Array( MAX_POINTS * 3 ); // itemSize * numVertices，3 numbers per point, Float32Array一个元素4个字节
geometry.setAttribute( 'position', new BufferAttribute( positions, 3 ) );

// draw range
drawCount = 2; // draw the first 2 points, only
geometry.setDrawRange( 0, drawCount );

// material
const material = new LineBasicMaterial( { color: 0xff0000 } );

// line
const line = new Line( geometry,  material );
scene.add( line );

updatePositions();

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild(renderer.domElement);

(function animate() {

  geometry.setDrawRange( 0, drawCount );

  if (drawCount === MAX_POINTS) {
    updatePositions();
    line.material.color.setHSL(Math.random(), 1, 0.5);
    drawCount = 0;
  } else {
    drawCount++;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
})();

function updatePositions() {
  const positions = line.geometry.attributes.position.array;

  let x = 0;
  let y = 0;
  let z = 0;
  let index = 0;

  for (let i = 0; i < MAX_POINTS; i++) {
    positions[ index ++ ] = x;
    positions[ index ++ ] = y;
    positions[ index ++ ] = z;

    x += ( Math.random() - 0.5 ) * 30;
    y += ( Math.random() - 0.5 ) * 30;
    z += ( Math.random() - 0.5 ) * 30;
  }

  line.geometry.attributes.position.needsUpdate = true; // 消耗很大，会自动重置为false
}
