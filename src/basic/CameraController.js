import camera from './Camera.js'
import machine from './Machine.js'
import math from './Math.js'

let target = null
let interpolation = .1
let targetHeight = 2

//ofset
let radio = 10
let up = 5

machine.addCallback(() => {

    if (target) {
        let x = target.position.x - Math.sin(target.rotation.y) * radio
        camera.position.x = math.lerp(camera.position.x, x, interpolation)

        let z = target.position.z - Math.cos(target.rotation.y) * radio
        camera.position.z = math.lerp(camera.position.z, z, interpolation)

        camera.lookAt(target.position.x, target.position.y + targetHeight, target.position.z)
        camera.position.y = math.lerp(camera.position.y, target.position.y + up, interpolation)
    }


})

let setTarget = (obj) => {
    target = obj
}

export default setTarget