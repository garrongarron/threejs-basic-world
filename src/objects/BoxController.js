import machine from '../basic/Machine.js'
import box from './Box.js'
import keyListener from '../basic/KeyListener.js'
import camera from '../basic/Camera.js'


keyListener.start()
machine.addCallback(()=>{
    if(box){
        if (keyListener.isPressed(65)) {
            box.position.z -=1
        }
        if (keyListener.isPressed(68)) {
            box.position.z +=1
        }
        if (keyListener.isPressed(87)) {
            box.position.x +=1
        }
        if (keyListener.isPressed(83)) {
            box.position.x -=1
        }
        camera.lookAt(box.position)
        camera.position.x = box.position.x-30
        camera.position.y = box.position.y+30
        camera.position.z = box.position.z
    }
    
})
