import camera from './Camera.js'
import machine from './Machine.js'
import math from './Math.js'

let target = null
let interpolation = .5
let targetHeight = 3

//ofset
let radio = 10
let up = 3

let camGap = -30
let valance = 0

document.addEventListener('mousemove', (e)=>{
    let semiScreen = window.innerWidth/2
    valance = (e.clientX-semiScreen)/semiScreen
})

machine.addCallback(() => {

    if (target) {
        let x = target.position.x - Math.sin(target.rotation.y+camGap*valance*Math.PI/180) * radio
        camera.position.x = math.lerp(camera.position.x, x, interpolation)

        let z = target.position.z - Math.cos(target.rotation.y+camGap*valance*Math.PI/180) * radio
        camera.position.z = math.lerp(camera.position.z, z, interpolation)

        let point = {
            x:target.position.x + Math.sin(target.rotation.y) * radio*20,
            z:target.position.z + Math.cos(target.rotation.y) * radio*20
        }
        camera.lookAt(point.x, target.position.y + targetHeight, point.z)
        camera.position.y = math.lerp(camera.position.y, target.position.y + up, interpolation)
    }
})

let setTarget = (obj) => {
    target = obj
}

export default setTarget