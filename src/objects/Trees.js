import fileList from "../models/Trees/FileList.js";
import gravity from '../character/Gravity.js'
let trees = []
let loadTrees = (scene) => {

    let load = () => {
        let n = 0

        //there are 6 trees
        trees = trees.map(object => {
            // object.position.set(n*4, 0, 0)
            let scale = 0.06
            object.scale.set(scale, scale, scale)
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            return object
        });

        setTimeout(() => {
            let i = 0
            while (i < 40) {
                let p = {
                    x: Math.random() * 256 - 128,
                    y: 0,
                    z: Math.random() * 256 - 128
                }
                let g = gravity.check(p)
                if (g.tmp) {
                    p.y = 1 - g.tmp.distance
                    // console.log(g.tmp.distance, p);
                    let tree = trees[Math.floor(Math.random() * trees.length)].clone()
                    tree.position.set(p.x, p.y, p.z)
                    scene.add(tree)
                    i++
                }
            }
        }, 1000 * 5);
    }

    const loader = new THREE.FBXLoader();
    let promises = []
    for (let index = 0; index < fileList.length; index++) {
        promises[index] = new Promise((resolve, reject) => {
            loader.load('src/models/Trees/' + fileList[index] + '_1.fbx', function (object) {
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