import machine from './Machine.js'

class Animator {
    constructor(mesh) {
        this.mixer = new THREE.AnimationMixer(mesh)
        this.clock = new THREE.Clock()
        machine.addCallback(() => {
            this.mixer.update(this.clock.getDelta());
        })
        this.clips = mesh.animations.map(animation => {
            return this.mixer.clipAction(animation)
        })
        this.lastClip = null
    }
    action(m) {
        if (this.lastClip === null) {
            this.clips[m].play();
            this.lastClip = m
            return
        }
        if (this.lastClip == m) return
        let time = 0.2
        this.clips[m].reset();
        this.clips[m].play();
        this.clips[this.lastClip].crossFadeTo(this.clips[m], time, true);
        this.lastClip = m
    }
}

export default Animator