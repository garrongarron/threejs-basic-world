
class SpatialHash {
    constructor(dimentions) {
        this.boxes = {}
        this.dimentions = dimentions
    }

    getBoxId(object) {
        let x = (Math.round(object.position.x / this.dimentions)) * this.dimentions
        let z = (Math.round(object.position.z / this.dimentions)) * this.dimentions
        return `i${x}.${z}`
    }

    add(object) {
        let id = this.getBoxId(object)
        if (!this.boxes[id]) {
            this.boxes[id] = {}
            this.boxes[id].element = [object]
            this.boxes[id].id = id
        } else {
            this.boxes[id].element.push(object)
            this.boxes[id].id = id
        }
    }

    update(object) {

    }

    delete(object) {

    }

    getBox(object) {
        let id = this.getBoxId(object)
        if (this.boxes[id]) {
            return this.boxes[id]
        }
        console.log(id);
        this.boxes[id] = {}
        this.boxes[id].element = [object]
        this.boxes[id].id = id
        return this.boxes[id]

    }

    getClosestElements(object) {
        let box = (this.getBox(object)) ? this.getBox(object) : []
        let minDistance = this.dimentions*5
        let selected = null
        let dist

        box.element.map((e) => {
            if (object == e) return
            dist = object.position.distanceTo(e.position)
            if (dist < minDistance) {
                selected = e
                minDistance = dist
            }
        })

        if (!selected) {
            console.log('second');
            let c = box.id.split('i')[1].split('.')
            let arr = []
            arr.push(this.boxes[`i${(c[0])}.${(c[1] + this.dimentions)}`])
            arr.push(this.boxes[`i${(c[0] + this.dimentions)}.${(c[1] + this.dimentions)}`])
            arr.push(this.boxes[`i${(c[0] + this.dimentions)}.${(c[1])}`])
            arr.push(this.boxes[`i${(c[0] + this.dimentions)}.${(c[1] - this.dimentions)}`])
            arr.push(this.boxes[`i${(c[0])}.${(c[1] + this.dimentions)}`])
            arr.push(this.boxes[`i${(c[0] - this.dimentions)}.${(c[1] - this.dimentions)}`])
            arr.push(this.boxes[`i${(c[0] - this.dimentions)}.${(c[1])}`])
            arr.push(this.boxes[`i${(c[0] - this.dimentions)}.${(c[1] - this.dimentions)}`])
            let a = []
            arr.forEach(element => {
                a.concat((element) ? element : [])
            });


            a.map((e) => {
                if (object == e) return
                dist = object.position.distanceTo(e.position)
                console.log(dist);
                if (dist < minDistance) {
                    selected = e
                    minDistance = dist
                }
            })

        }
        if (selected)
            return { selected: selected, minDistance, position: selected.position }
        else
            return { selected: selected }
    }
}
let spatialHash = new SpatialHash(100)
export default spatialHash