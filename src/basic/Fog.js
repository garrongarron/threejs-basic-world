let setFog = (scene) => {
    scene.background = new THREE.Color().setHSL(0.6, 0, 1);
    scene.fog = new THREE.Fog(scene.background, 1, 500);
    scene.fog.color.copy(  new THREE.Color( 0xffffff )  );
}

export default setFog