import { directionalLight, ambientLight } from './basic/Lights.js'
import texture from './basic/Cube.js'
import plane from './objects/Plane.js'
import box from './objects/Box.js'

const scene = new THREE.Scene();

scene.add(directionalLight);
scene.add(ambientLight);

scene.add(plane);
scene.add(box);

scene.background = texture;

export default scene