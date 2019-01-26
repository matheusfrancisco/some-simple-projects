
/*function Shape(color){
    this.color = color;

}

Shape.prototype.duplicate = function () {
    console.log('duplicate')
}


function Circle(radius, color) {
    //Super constructor
    Shape.call(this, color);
    this.radius = radius;
}

// Circle.prototype,constructor = Circle;
// new Circle.prototype.constructor => new Circle;
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function () {
    console.log('draw');
}
 

const s = new Shape();
const c = new Circle(1, 'red');
*/

/*
function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Shape(){
}

Shape.prototype.duplicate = function(){
    console.log('duplicate');
}

function Circle() {
}

extend(Circle,Shape);

Circle.prototype.duplicate = function () {
    //Shape.prototype.duplicate.call(this);
    console.log('duplicate circle');
}

function Square(){

}

extend(Square,Shape); 

Square.prototype.duplicate = function () {
    //Shape.prototype.duplicate.call(this);
    console.log('duplicate Square');
}

const shapes = [
    new Circle(),
    new Square()
];
//Polymorphis
for (let shape of shapes){
    shape.duplicate();
    //shape.duplicate();
    /*if(shape.type === 'circle')
        duplicateCircle();
    else if (shape.type === 'square')
        duplicateSquare();
    else 
        duplocateShape();
}*/


// Mixin
function mixin(target, ...sources){
    Object.assign(target, ...sources);
}

const canEat = {
    eat: function(){
        this.hunger--;
        console.log('eating');
    }
};

const canWalk = {
    walk: function(){
        console.log('walking');
    }
};

const canSwim = {
    swim: function () {
        console.log('swim');
    }
};

function Person(){

}

mixin(Person.prototype, canEat, canWalk);
const person = new Person();
console.log(person);


function Goldfish(){

}

mixin(Goldfish.prototype, canEat, canSwim);
const goldfish = new Goldfish();
console.log(goldfish);