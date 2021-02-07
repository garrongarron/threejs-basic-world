class KeyListener {
    constructor(){
        this.keys = {}
        this.handler = [
            this.down.bind(this), 
            this.up.bind(this)
        ]
    }
    start(){
        document.addEventListener('keydown',this.handler[0])
        document.addEventListener('keyup',this.handler[1])
    }
    stop(){
        document.removeEventListener('keydown',this.handler[0])
        document.removeEventListener('keyup',this.handler[1])
        for (let key in this.keys) {
            this.keys[key] = false
        }
    }
    down(e){
        this.keys[e.keyCode] = true 
        if(e.keyCode==18) e.preventDefault()
        return false
    }
    up(e){
        this.keys[e.keyCode] = false
        if(e.keyCode==18) e.preventDefault()
        return false
    }
    isPressed(keyCode){
        return (this.keys[keyCode])?true:false
    }
}
const keyListener = new KeyListener()
export default keyListener
