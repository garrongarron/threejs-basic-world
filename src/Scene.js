import { directionalLight, ambientLight } from './basic/Lights.js'
import texture from './basic/Cube.js'
import setSky from './basic/Sky.js'
import setFog from './basic/Fog.js'
import setTarget from "./controllers/CameraController.js";
import plane1 from './objects/Plane.js'
import loadPlaneTerrain from './objects/PlaneTerrain.js'
import box from './objects/Box.js'
import setCharacter, { mode, setController } from './controllers/CharacterController.js';
import mouseController from './controllers/MouseController.js';
import loadCharacter from './basic/Character.js'
import loadTrees from './objects/Trees.js'
// import loadPlane from './objects/Plane2.js'//shaders doesnt work

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


//trees
loadTrees(scene)//ok


//ground
// scene.add(plane1);
// loadPlane(scene)//shaders it doesnt work
loadPlaneTerrain(scene)


//center
let box2 = box.clone()
scene.add(box2);

//character
scene.add(box);
// setTarget(box);
// setCharacter(box);

//other character
loadCharacter(scene, (palading) => {
    mouseController(palading)
    setCharacter(palading)
    setController(mode.forwardBackwardAndRotation)
    /*
    setTarget(palading)//camera
    setCharacter(palading)//camera
    //character controller
    setController(mode.forwardBackwardAndRotation)
    */
})















export default scene