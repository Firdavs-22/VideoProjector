class Parent {
    constructor() {
        this.child = new Child(this)
        this.amount = 0
    }
}
class Child {
    constructor(parent) {
        this.parent = parent
    }

    plus(){
        this.parent.amount++
    }
}

let parent = new Parent()
console.log(parent)
parent.child.plus()
console.log(parent)