import {
  AmbientLight,
  Color, Face3,
  Geometry, Mesh, MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.z = 500;

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth/3, window.innerHeight/3);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const light = new AmbientLight(0xffffff);
scene.add(light);

const material = new MeshStandardMaterial( { vertexColors : true } );

//create a triangular geometry
const geometry = new Geometry();
geometry.vertices.push( new Vector3( -50, -50, 0 ) );
geometry.vertices.push( new Vector3(  50, -50, 0 ) );
geometry.vertices.push( new Vector3(  50,  50, 0 ) );

//create a new face using vertices 0, 1, 2
const normal = new Vector3( 0, 0, 1 ); //optional
const color = new Color( 0xff0000 ); //optional
const materialIndex = 0; //optional
const face = new Face3( 0, 1, 2, normal, color, materialIndex );

//add the face to the geometry's faces array
geometry.faces.push( face );

//the face normals and vertex normals can be calculated automatically if not supplied above
// geometry.computeFaceNormals();
// geometry.computeVertexNormals();

scene.add( new Mesh( geometry, material ) );


(function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
})();
