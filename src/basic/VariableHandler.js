const panel = new dat.GUI();
const folder = panel.addFolder('Terrain Parameters');

let runPanel = (material, materialShader) => {
    let uniforms = materialShader.uniforms;
    panel.add(uniforms.u_octaves, 'value', 1, 10).step( 1.0 ).onChange(modifyTimeScale).name("Octaves");
    panel.add(uniforms.u_height, 'value', 5, 150).onChange(modifyTimeScale).name("Height");
    panel.add(uniforms.u_zoom, 'value', 1, 150).onChange(modifyTimeScale).name("Zoom");
    panel.add(uniforms.u_amplitud, 'value', 0.0, 1.5).onChange(modifyTimeScale).name("Amplitude");;
    panel.add(uniforms.u_frequency, 'value', 0.01, 10.).onChange(modifyTimeScale).name("Frecuency");;
    panel.add(material, 'wireframe').onChange(modifyTimeScale).name("Wireframe");;
    folder.open();

}
let modifyTimeScale = () => {
    // console.log('ok', uniforms.u_height.value);
    // geometry.elementsNeedUpdate = true;
    // geometry.verticesNeedUpdate = true;
    // geometry.computeVertexNormals();
}
export default runPanel
