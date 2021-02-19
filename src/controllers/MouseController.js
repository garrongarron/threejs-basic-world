import delta, { acumulated } from '../basic/Mouse.js'
import machine from '../basic/Machine.js'
import camera from '../basic/Camera.js'
import math from '../basic/Math.js'
import keyListener from '../basic/KeyListener.js'
import { getDelta } from '../basic/Clock.js'
import gravity from '../character/Gravity.js'
// import '../objects/pointer.js'
// import './ShooterSystem.js'

let interpolation = .99
let rotation = 0
let gap = 20
let rotationWithGap = 0
let radio = 10
let speed = 5
let lastN = []
let rotationSpeed = 20
let characterHeight = 3
let cameraAngle = 3
let prevAcumulatedY = 0

let target = null
let setTarget = (t) => {
    target = t
}
keyListener.start()
machine.addCallback(() => {
    if (target) {
        let angleRotation = (acumulated.x / rotationSpeed)
        rotation = - (angleRotation) * Math.PI / 180
        rotationWithGap = - (angleRotation + gap) * Math.PI / 180
        let rotationWithGap2 = - (angleRotation + gap / 2) * Math.PI / 180

        let x = target.position.x - Math.sin(rotation) * radio;
        camera.position.x = math.lerp(camera.position.x, x, interpolation)

        let z = target.position.z - Math.cos(rotation) * radio;
        camera.position.z = math.lerp(camera.position.z, z, interpolation)



        let g = gravity.check(camera.position)
        // console.log(camera.position.y);
        if (g.tmp != undefined) {
            if (g.tmp.distance < 2) {
                camera.position.y += 2 - g.tmp.distance;
            }
        } 
        if(prevAcumulatedY==delta.y){
            delta.y = 0
        }

        prevAcumulatedY = delta.y
        camera.position.y += delta.y / 100





        let opositeCamPosition = {
            position: {
                x: target.position.x + Math.sin(rotationWithGap) * radio,
                z: target.position.z + Math.cos(rotationWithGap) * radio
            }
        }

        // camera.lookAt(opositeCamPosition.position.x, target.position.y - cameraAngle, opositeCamPosition.position.z)
        camera.lookAt(opositeCamPosition.position.x, target.position.y - 0, opositeCamPosition.position.z)

        let n = getDelta()
        lastN.push(n)
        if (lastN.length > 10) {
            n = lastN.reduce((a, b) => a + b, 0) / 11;
            lastN.shift()
            // console.log(11);
        }
        if (keyListener.isPressed(87)) {
            target.rotation.y = rotationWithGap2
            target.position.x += Math.sin(rotationWithGap2) * speed * n
            target.position.z += Math.cos(rotationWithGap2) * speed * n
        }
        if (keyListener.isPressed(83)) {
            target.rotation.y = rotationWithGap2
            target.position.x -= Math.sin(rotationWithGap2) * speed * n
            target.position.z -= Math.cos(rotationWithGap2) * speed * n
        }
    }
})

export default setTarget