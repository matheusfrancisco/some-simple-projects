class CalculatorController
{

    constructor()
    {
        this._operation = [];
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
    
    clearAll()
    {
        this._operation = [];
    }

    clearEntry()
    {
        this._operation.pop();
    }

    getLastOperation()
    {
        return this._operation[this._operation.length -1];
    }
    
    isOperator(value)
    {
        return (['+', '-', '*', '%','/'].indexOf(value) > -1);

    }
    setLastOperation(value)
    {
        this._operation[this._operation.length - 1] = value;

    }
    calculate() {
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last];
    }

    pushOperation(value)
    {
        this._operation.push(value);
        console.log(this._operation);

        if(this._operation.length>3)
        {
            //console.log(this._operation);

            this.calculate();

            //console.log(this._operation);
        }
    }
    
    setLastNumberToDsiplay()
    {
        let lastNumber ;
        for (let index = this._operation.length -1; index >= 0 ; index--) {
            lastNumber = this._operation[index];
            
        }
        this.displayCalculator = lastNumber;
    }

    addOperator(value)
    {
       console.log('A', value, isNaN(this.getLastOperation()));
        if(isNaN(this.getLastOperation()))
        {
            //String
            if(this.isOperator(value))
            {
                //change the last operator
                this.setLastOperation(value);

            }else if(isNaN(value)){

                console.log('Outra coisa',value);

            }else{
                this.pushOperation(value);
                this.setLastNumberToDsiplay();

            }
            
        }else{
            if(this.isOperator(value))
            {
                this.pushOperation(value);
            }else{
                //Number
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                this.setLastNumberToDsiplay();
            }
        }
        //console.log(this._operation);
    }

    setError()
    {
        this.displayCalculator="Error";
    }

    executeBtn(value)
    {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperator('+');

                break;
            case 'subtracao':
                this.addOperator('-');

                break;
            case 'divisao':
                this.addOperator('/');

                break;
            case 'multiplicacao':
                this.addOperator('*');

                break;
            case 'porcento':
                this.addOperator('%');

                break;
            case 'igual':

                break;
           
            case "ponto":
                this.addOperator('.');

                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperator(parseInt(value));

                break;
        
            default:
                this.setError();
                break;
        }
    }
    initButtonsEvent()
    {
        let buttons = document.querySelectorAll("#buttons > g, #parts >g");
        buttons.forEach((btn,index) => {
            //drag efect slide...
            this.addEventListenerAll(btn,"click drag", e => {
                //console.log(btn.className.baseVal.replace("btn-",""));
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.executeBtn(textBtn);
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