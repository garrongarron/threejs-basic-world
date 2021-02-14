import { directionalLight, ambientLight } from './basic/Lights.js'
// import texture from './basic/Cube.js'
import loadPlane from './objects/Plane.js'
import box from './objects/Box.js'
import './objects/BoxController.js'
const scene = new THREE.Scene();

scene.add(directionalLight);
scene.add(ambientLight);

loadPlane(scene);
scene.add(box);

// const color = 0xFFFFFF;  // white
// const near = 10;
// const far = 100;
// scene.fog = new THREE.Fog(color, near, far);
// scene.background = texture;

export default scene