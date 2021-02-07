import machine from './Machine.js'
let interpolationTime = .2
let mixer
let inProgress = false
function onLoopFinished(event) {
    inProgress = false
    console.log('done');
}
class Animator {
    constructor(mesh) {
        mixer = new THREE.AnimationMixer(mesh)
        this.clock = new THREE.Clock()
        machine.addCallback(() => {
            mixer.update(this.clock.getDelta());
        })
        this.clips = mesh.animations.map(animation => {
            return mixer.clipAction(animation)
        })
        this.lastClip = null
    }
    action(m, timeScale, loop) {
        //wait for loop
        if (inProgress) return
        if (loop) {
            mixer.addEventListener('loop', onLoopFinished);
            inProgress = true
        }
        //speed uot
        mixer.timeScale = timeScale
        //first time
        if (this.lastClip === null) {
            this.clips[m].play();
            this.lastClip = m
            console.log('first');
            return
        }
        //repetition
        if (this.lastClip == m) return
        //crossFade
        this.clips[m].reset();
        this.clips[m].play();
        this.clips[this.lastClip].crossFadeTo(this.clips[m], interpolationTime, true);
        this.lastClip = m
    }
}

export default Animator