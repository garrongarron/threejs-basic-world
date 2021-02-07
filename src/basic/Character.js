import machine from './Machine.js'
import fileList from "../models/SwordAndShield/FileList.js";

let mixer;
let character;
const clock = new THREE.Clock();
let delta;
let animations = []
let model
let loadCharacter = (scene, callback) => {

    let load = (object) => {
        object.position.set(2, 0, 0)
        object.rotation.y = Math.PI
        let s = 0.02
        object.scale.set(s, s, s)
        mixer = new THREE.AnimationMixer(object);
        object.name = "Paladin"

        character = object
        character.animations = animations
        // console.log(character.animations.length);
        // console.log(character);
        // const action = mixer.clipAction(character.animations[49]);
        // console.log(action);
        // action.play();
        character.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        scene.add(object);
    }


    const loader = new THREE.FBXLoader();
    let promises = []
    for (let index = 0; index < fileList.length; index++) {
        promises[index] = new Promise((resolve, reject) => {
            loader.load('src/models/SwordAndShield/' + fileList[index], function (object) {
                if (index == 0) {
                    model = object
                }
                animations[index] = object.animations[0]
                resolve(index)
            })
        })
    }
    model = promises.shift()
    Promise.all(promises).then((a) => {
        console.log('ALL LOADED');
        setTimeout(() => {
            load(model)
            callback(model)
        }, 1000*3);

    })
}

machine.addCallback(() => {
    delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    if (character) {
        // console.log(character.position);
    }
})

export default loadCharacter
export { character }