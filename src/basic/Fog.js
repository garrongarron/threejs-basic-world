let setFog = (scene) => {
    scene.background = new THREE.Color().setHSL(0.6, 0, 1);
    scene.fog = new THREE.Fog(scene.background, 1, 200);
    scene.fog.color.copy(  new THREE.Color( 0x000011 )  );
}

export default setFog