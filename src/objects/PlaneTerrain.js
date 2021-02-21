import noise from '../shaders/NoiseMaker.js'
import loadTextures, { addCallback } from '../textures/Textures.js'
import getBlend from '../textures/Blend.js'

let plane
let size = 1024
let loadPlaneTerrain = (scene) => {
  const geometry = new THREE.PlaneGeometry(size, size, 120, 120);
  // const material = new THREE.MeshBasicMaterial({ color: 0x1A48D6, side: THREE.DoubleSide });

  addCallback((t) => {
    console.log(t);
    // const material = new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: THREE.VertexColors });
    const material = getBlend();
    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);
    let offset = { x: 0, y: 0 }
    modifyTimeScale(offset)
    colored(offset)
  })
  loadTextures()

}
const panel = new dat.GUI();
const folder = panel.addFolder('Terrain Parameters');

// let params = {
//   noiseType: 'perlin',
//   scale: 15,
//   octaves: 2,
//   persistence: .5,
//   lacunarity: 7,
//   exponentiation: 6,
//   seed: 1,
//   height: 50
// }
let params = {
  noiseType: 'perlin',
  scale: 35,
  octaves: 3,
  persistence: .22,
  lacunarity: 6.9,
  exponentiation: 5.8,
  seed: 1,
  height: 200
}

let gen = new noise.Noise(params)
let sat = (x) => {
  return Math.min(Math.max(x, 0.0), 1.0);
}



let modifyTimeScale = (offset) => {
  for (let v of plane.geometry.vertices) {
    const heightPairs = [];
    v.z = 0;
    v.z = gen.Get(v.x + offset.x, v.y + offset.y)
    v.x += Math.random()*2-1
    v.y += Math.random()*2-1
  }
}

let colored = (offset) => {
  //  COLORING
  const GREEN = new THREE.Color(0x000000);
  for (let f of plane.geometry.faces) {
    const vs = [
      plane.geometry.vertices[f.a],
      plane.geometry.vertices[f.b],
      plane.geometry.vertices[f.c]
    ];

    const vertexColours = [];
    for (let v of vs) {
      let h = gen.Get(v.x + offset.x, v.y + offset.y);
      const a = sat(h / 16);
      let vc
      if (a > 0.25) {
        vc = new THREE.Color(0xffffff);
        vc.lerp(GREEN, a);
      } else if (a > 0.15) {
        vc = new THREE.Color(0x8B4726);
        vc.lerp(GREEN, a);
      } else if (a > 0.1) {
        vc = new THREE.Color(0x008B00);
        vc.lerp(GREEN, a);
      } else {
        vc = new THREE.Color(0x8B6508);
        vc.lerp(GREEN, a);
      }


      vertexColours.push(vc);
    }
    f.vertexColors = vertexColours;


  }
  // plane.material.color.setHex( 0xff0000 );

  plane.material.colorsNeedUpdate = true;
  plane.geometry.groupsNeedUpdate = true
  plane.geometry.elementsNeedUpdate = true;
  plane.geometry.verticesNeedUpdate = true;
  plane.geometry.computeVertexNormals();
}

panel.add(params, 'scale', 1, 200).step(1.0).onChange(modifyTimeScale).name("scale");
panel.add(params, 'octaves', 1, 15, 1).onChange(modifyTimeScale).name("octaves");
panel.add(params, 'persistence', 0.01, 1).onChange(modifyTimeScale).name("persistence");
panel.add(params, 'lacunarity', 0, 20).onChange(modifyTimeScale).name("lacunarity");;
panel.add(params, 'exponentiation', 0.1, 10).onChange(modifyTimeScale).name("exponentiation");;
// panel.add(params, 'seed', 0, 1).onChange(modifyTimeScale).name("seed");
panel.add(params, 'height', 0, 1000).onChange(modifyTimeScale).name("height");
folder.open();





export default loadPlaneTerrain