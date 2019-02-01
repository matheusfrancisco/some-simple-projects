class WhatsAppController{


    constructor(){

        console.log('Test');

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    loadElements(){
        
        this.el ={};
        //create elemente for ID dynamic
        //create id using HTML
        document.querySelectorAll('[id]').forEach(element =>{
            
            this.el[Format.getCamelCase(element.id)] = element;

        });
    }

    elementsPrototype(){

        Element.prototype.hide = function () {
            this.style.display = 'none';
            return this;

        }
        
        Element.prototype.show = function () {
            this.style.display = 'block';
            return this;
        }
        
        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === 'none') ? 'block':'none';
            return this;

        }

        Element.prototype.on = function (events, fn) {
            
            events.split(' ').forEach(event=>{
                this.addEventListener(event,fn);
            });
            return this;

        }

        Element.prototype.css = function (styles) {

            for (let name in styles){
                this.style[name] = styles[name];
            }
            return this;

            
        }
        
        Element.prototype.addClass = function(name){
            this.classList.add(name);
            return this;

        
        }

        Element.prototype.removeClass = function(name){
            this.classList.remove(name);
            return this;

        }

        Element.prototype.toggleClass = function (name) {
            this.classList.toggle(name);
            return this;

        }

        Element.prototype.hasClass = function (name) {
            return this.classList.contains(name);
        }
    }

    initEvents(){

        
    }
}



