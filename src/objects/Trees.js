import fileList from "../models/Trees/FileList.js";

let trees = []
let loadTrees = (scene) => {

    let load = () => {
        let n = 0
        trees = trees.map(object => {
            // object.position.set(n*4, 0, 0)
            let scale = 0.2
            object.scale.set(scale, scale, scale)
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            return object
        });
        for (let index = 0; index < 40; index++) {
            let tree = trees[Math.floor(Math.random()*trees.length)].clone()
            tree.position.set(Math.random()*100-50, 0, Math.random()*100-50)
            scene.add(tree)
        }
    }
    const loader = new THREE.FBXLoader();
    let promises = []
    for (let index = 0; index < fileList.length; index++) {
        promises[index] = new Promise((resolve, reject) => {
            loader.load('src/models/Trees/' + fileList[index]+'_1.fbx', function (object) {
                trees.push(object)
                resolve()
            })
        })
    }
    Promise.all(promises).then((a) => {
        console.log('ALL LOADED');
        load()
    })
}
export default loadTrees