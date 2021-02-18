import machine from '../basic/Machine.js'
import box from '../objects/Box.js'
import getChunk, { getChunkLR, getGroup } from './Chunk.js'


let unit = 10//let geometry = new THREE.PlaneGeometry(unit, unit, 100, 100);
let lastRequest = ''
let chunk = []
let chunkLow = []
let createChunks = (x, z) => {
    if (lastRequest == `${x}.${z}`) {
        return
    } else {
        lastRequest = `${x}.${z}`
    }
    let n = 0
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            chunk[n].mesh.position.x = x + unit * i
            chunk[n].mesh.position.z = z + unit * j
            //con estas lineas se actualizan los vertex shaders
            chunk[n].material.uniforms.u_x.value = x + unit * i
            chunk[n].material.uniforms.u_y.value = z + unit * j

            //con estas lineas se actualizarina los vertx en javascript
            chunk[n].geometry.verticesNeedUpdate = true;
            chunk[n].geometry.elementsNeedUpdate = true;
            chunk[n].geometry.computeVertexNormals();
            n++
        }
    }
    n = 0
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (!(i == 0 && j == 0)) {
                chunkLow[n].mesh.position.x = x + unit * i * 3
                chunkLow[n].mesh.position.z = z + unit * j * 3
                chunkLow[n].material.uniforms.u_x.value = x + unit * i * 3
                chunkLow[n].material.uniforms.u_y.value = z + unit * j * 3
                n++
            }
        }
    }

}
let run = (scene) => {
    for (let index = 0; index < 9; index++) {
        chunk.push(getChunk(0, 0, unit))
    }
    for (let index = 0; index < 8; index++) {
        chunkLow.push(getChunkLR(0, 0, unit * 3.1))
    }
    scene.add(getGroup())
    machine.addCallback(() => {
        createChunks(
            Math.round(box.position.x / unit) * unit,
            Math.round(box.position.z / unit) * unit
        );
    })
}


export default run