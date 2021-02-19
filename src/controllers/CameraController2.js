import camera from './Camera.js'
import machine from './Machine.js'
import math from './Math.js'

////////////////////////////////////////////////////////////////////////
let canvas = document.querySelector('canvas');
canvas.requestPointerLock = canvas.requestPointerLock ||
    canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock;

canvas.onclick = function () {
    canvas.requestPointerLock();
};
let xx = 0;
let yy = 0;

let updatePosition = (e) => {
    xx = e.movementX;
    yy += e.movementY;
}
let lockChangeAlert = () => {
    if (document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas) {
        console.log('The pointer lock status is now locked');
        document.addEventListener("mousemove", updatePosition, false);
    } else {
        console.log('The pointer lock status is now unlocked');
        document.removeEventListener("mousemove", updatePosition, false);
    }
}
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

////////////////////////////////////////////////////////////////////////









let target = null
let interpolation = .5
let targetHeight = 0

//ofset
let radio = 10
let up = 0 //8

let camGap = -30
let valance = 0

let pointAhead = 0

document.addEventListener('mousemove', (e) => {
    // let semiScreen = window.innerWidth / 2
    // valance = (e.clientX - semiScreen) / semiScreen
})

machine.addCallback(() => {

    if (target) {
        // let x = target.position.x - Math.sin(target.rotation.y + camGap * valance * Math.PI / 180) * radio
        let x = target.position.x - Math.sin(target.rotation.y ) * radio
        camera.position.x = math.lerp(camera.position.x, x, interpolation)

        // let y = target.position.y + up;
        let y = target.position.y ;
        camera.position.y = math.lerp(camera.position.y, y, interpolation)


        // let z = target.position.z - Math.cos(target.rotation.y + camGap * valance * Math.PI / 180) * radio
        let z = target.position.z - Math.cos(target.rotation.y) * radio
        camera.position.z = math.lerp(camera.position.z, z, interpolation)

        let point = {
            // x: target.position.x + Math.sin(target.rotation.y) * radio * pointAhead,
            // z: target.position.z + Math.cos(target.rotation.y) * radio * pointAhead
            x: target.position.x + Math.sin(target.rotation.y) * radio ,
            z: target.position.z + Math.cos(target.rotation.y) * radio
        }
        // camera.lookAt(point.x, target.position.y + targetHeight, point.z)
        camera.lookAt(point.x, target.position.y +2, point.z)
        camera.position.y = math.lerp(camera.position.y, target.position.y, interpolation)
    }
})

let setTarget = (obj) => {
    target = obj
}

export default setTarget