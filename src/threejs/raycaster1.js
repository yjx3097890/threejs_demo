import {
  AmbientLight,
  BoxGeometry, DoubleSide, Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer
} from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
camera.position.z = 1000;

const geometry = new BoxGeometry(50, 50, 50);
const material = new MeshBasicMaterial({color: 0xffffff});
material.side = DoubleSide;
for (let i = 0; i < 20; i++) {
  const mesh = new Mesh(geometry, material.clone());
  mesh.position.set(500*Math.random() - 250, 500*Math.random() - 250, 500*Math.random())
  scene.add(mesh);
}

const renderer = new WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth/3, window.innerHeight/3);
document.body.appendChild(renderer.domElement);


const raycaster = new Raycaster();
const mouse = new Vector2();

function onMouseMove( event ) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = ( event.clientX / (window.innerWidth / 3) ) * 2 - 1;
  mouse.y = - ( event.clientY / (window.innerHeight / 3) ) * 2 + 1;

 }

window.addEventListener( 'mousemove', onMouseMove, false );


(function animate() {
  requestAnimationFrame(animate);

  scene.children.forEach((mesh) => {
    mesh.material.color.set( 0xffffff );
  });

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera( mouse, camera );

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects( scene.children );

  for ( let i = 0; i < intersects.length; i++ ) {

    intersects[ i ].object.material.color.set( 0xff0000 );

  }

  renderer.render(scene, camera);
})();
