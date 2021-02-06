import { directionalLight, ambientLight } from './basic/Lights.js'
import texture from './basic/Cube.js'
import setSky from './basic/Sky.js'
import setFog from './basic/Fog.js'
import setTarget from "./basic/CameraController.js";
import plane from './objects/Plane.js'
import box from './objects/Box.js'
import setCharacter, { mode, setController } from './basic/CharacterController.js';
import loadCharacter from './basic/Character.js'

const scene = new THREE.Scene();

//lights
scene.add(directionalLight);
scene.add(ambientLight);

if (false) {
    //cube
    scene.background = texture;
} else {
    //sky
    setSky(scene)
    setFog(scene)
}


//ground
scene.add(plane);

//center
let box2 = box.clone()
scene.add(box2);

//character
scene.add(box);
// setTarget(box);
// setCharacter(box);

//other character
loadCharacter(scene, (palading) => {
    setTarget(palading)
    setCharacter(palading)
    //character controller
    setController(mode.forwardBackwardAndRotation)
})





export default scene