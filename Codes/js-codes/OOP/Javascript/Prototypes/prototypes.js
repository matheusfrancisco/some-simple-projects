//Object.getPrototypeOf(myObj);
// myObj.___proto___(parent of myObj)
// contructor.prototype()

function Circle(radius) {
    this.radius = radius;

  
    this.move = function () {
        this.draw();
        console.log('move');
    }
}

//const circle = new Circle(10);


let person = { name: 'Matheus'};
//let objectBase = Object.getPrototypeOf(person);
//let descriptor = Object.getOwnPropertyDescriptor(objectBase,'toString');
//console.log(descriptor);

//by default writable, enumerable, configurable... is ture;
Object.defineProperty(person, 'name',{
    writable:false
})

//person.name = 'John';
//console.log(person);


Circle.prototype.draw = function () {
        console.log('draw');
    
}
const c1 = new Circle(1);

Circle.prototype.toString = function () {
    return 'Circule with radius ' + this.radius;
}

const circle = new Circle(10);

// Returns instance members
console.log(Object.keys(c1));

// Returns all members (instance + prototype)
for (let key in c1) console.log(key);


