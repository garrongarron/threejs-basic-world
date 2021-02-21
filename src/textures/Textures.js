let loadTextures = () => {
    var loader = new THREE.TextureLoader();

    let promise1 = new Promise((resolve, reject) => { loader.load('demo/img/sand1.jpg', (t1) => { resolve(t1) }) })
    
    let promise2 = new Promise((resolve, reject) => { loader.load('demo/img/grass1.jpg', (t2) => { resolve(t2) }) })
    
    
    // let promise3 = new Promise((resolve, reject) => { loader.load('demo/img/stone1.jpg', (t3) => { resolve(t3) }) })
    let promise3 = new Promise((resolve, reject) => { loader.load('images/rock-512.jpg', (t3) => { resolve(t3) }) })
    
    let promise4 = new Promise((resolve, reject) => { loader.load('demo/img/snow1.jpg', (t4) => { resolve(t4) }) })
    Promise.all([promise1, promise2, promise3, promise4]).then(t => {
        callbacks.map(callback => {
            callback(t)
        })
    })

}
let callbacks = []
let addCallback = (callback) => {
    callbacks.push(callback)
}

export default loadTextures
export { addCallback }