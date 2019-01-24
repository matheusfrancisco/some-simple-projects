class CalculatorController
{

    constructor()
    {
        this._locale = 'pt-BR';
        this._displayCalculatorElement = document.querySelector("#display");
        this._dateElement = document.querySelector("#data");
        this._timeElement = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvent();
        
    }

    initialize(){
        this.setDisplayDateTime();
        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

    }
    
    addEventListenerAll(element ,events, fn)
    {
        events.split(' ').forEach(event=>{
            element.addEventListener(event, fn, false);
        });

    }
    
    initButtonsEvent()
    {
        let buttons = document.querySelectorAll("#buttons > g, #parts >g");
        buttons.forEach((btn,index) => {
            //drag efect slide...
            this.addEventListenerAll(btn,"click drag", e => {
                console.log(btn.className.baseVal.replace("btn-",""));
                
            });
            this.addEventListenerAll(btn, "mouseover mouseup mousedow", e=>{
                btn.style.cursor = "pointer";
            });
        });
        
    }

    setDisplayDateTime()
    {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }
    
    get displayTime(){
        return this._timeElement.innetHTML;
    }

    set displayTime(value) {
        this._timeElement.innerHTML = value;

    }

    get displayDate(){
        return this._dateElement.innerHTML;
    }

    set displayDate(value){
        return this._dateElement.innerHTML = value;

    }
    get displayCalculator()
    {
        return this._displayCalculatorElement.innerHTML;
    }
    set displayCalculator(value)
    {
        this._displayCalculatorElement.innerHTML = value;
    }

    get currentDate()
    {
        return new Date();
    }

    set currentDate(value)
    {
        this._currentDate = value;
    }

}