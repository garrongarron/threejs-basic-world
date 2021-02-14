import machine from '../basic/Machine.js'
import box from '../objects/Box.js'
import getChunk from './Chunk.js'


let unit = 100//let geometry = new THREE.PlaneGeometry(unit, unit, 100, 100);
let lastRequest = ''
let chunk = []
let createChunks = (x, z) => {
    if(lastRequest == `${x}.${z}`) {
        return
    } else {
        lastRequest = `${x}.${z}`
        console.log(x, z);
        console.log(chunk);
    }
    let n = 0
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            chunk[n].mesh.position.x = x+unit*i
            chunk[n].mesh.position.z = z+unit*j
            chunk[n].material.uniforms.u_x.value = x+unit*i
            chunk[n].material.uniforms.u_y.value = z+unit*j
            n++
        }
    }
 
}
let run = (scene) =>{
    for (let index = 0; index < 9; index++) {
        chunk.push(getChunk(0, 0, scene, unit))
    }
    machine.addCallback(() => {
        createChunks(
            Math.round(box.position.x / unit) * unit,
            Math.round(box.position.z / unit) * unit
        );
    })
}


export default run