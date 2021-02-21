import shaders from './SkyShaders.js'

let setSky = (scene) => {

    const uniforms = {
        "topColor": { value: new THREE.Color(0x81C1E2 ) },//0x2471A3 //0x377C9B //0x81C1E2
        "bottomColor": { value: new THREE.Color(0xf9cf8d ) },//0xf9cf8d //0xFB9B1A
        "offset": { value: 10 },
        "exponent": { value: .3}
    };

    const skyGeo = new THREE.SphereGeometry(400, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: shaders._VS,
        fragmentShader: shaders._FS,
        side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);
}

export default  setSky 