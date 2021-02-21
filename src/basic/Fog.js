let setFog = (scene) => {
    // scene.background = new THREE.Color( 0xAED6F1 ) //new THREE.Color().setHSL(0.6, 0, 1);
    scene.fog = new THREE.Fog(scene.background, 50, 400);
    scene.fog.color.copy(  new THREE.Color(
        0x8FA2A6
         )  );//85929E
}

export default setFog