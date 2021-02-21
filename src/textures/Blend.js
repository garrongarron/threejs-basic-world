import { addCallback } from './Textures.js'
//MATERIAL
let blend = null
addCallback((t) => {
    blend = THREE.Terrain.generateBlendedMaterial([
        { texture: t[0] },
        { texture: t[1], levels: [-80, -35, 20, 50] },
        { texture: t[2], levels: [20, 50, 60, 85] },
        { texture: t[3], glsl: '1.0 - smoothstep(65.0 + smoothstep(-256.0, 256.0, vPosition.x) * 10.0, 80.0, vPosition.z)' },
        { texture: t[2], glsl: 'slope > 0.7853981633974483 ? 0.2 : 1.0 - smoothstep(0.47123889803846897, 0.7853981633974483, slope) + 0.2' }, // between 27 and 45 degrees
    ]);
})

let getBlend = ()=> {
    return blend
}
export default getBlend