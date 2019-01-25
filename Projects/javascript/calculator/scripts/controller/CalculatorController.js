class CalculatorController
{

    constructor()
    {
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber ='';

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalculatorElement = document.querySelector("#display");
        this._dateElement = document.querySelector("#data");
        this._timeElement = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvent();
        this.initKeyboard();
        
    }
    pasteFromClipboard(){
        document.addEventListener('paste', e=>{
            let text = e.clipboardData.getData('Text'); 
            this.displayCalculator = parseFloat(text);
            
        });
    }

    copyToClipboard(){

        let input = documente.createElement('input');
        input.value = this.displayCalculator;
        document.body.appendChild(input);
        input.select();
        document.execCommand("Copy");
        input.remove();
    }
    initialize(){
        this.setDisplayDateTime();
        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);
        this.setLastNumberToDsiplay();
        this.pasteFromClipboard();
        document.querySelectorAll('.btn.ac').forEach(btn=>{
            btn.addEventListenerAll('dbclick', e=>{
                this.toogleAudio();
            })
        })

    }
    toogleAudio(){
        this._audioOnOff = !this._audioOnOff;
    }
    playAudio(){
        if(this._audioOnOff)
        {
            this._audio.currentTime  = 0;
            this._audio.play();
        }
    }

    initKeyboard()
    {
        this.playAudio();
        document.addEventListener('keyup', e=>{
            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    this.addOperator(e.key);

                    break;
                case 'Enter':
                case '=':
                    this.calculate();

                    break;

                case ".":
                case ",":
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
                    this.addOperator(parseInt(e.key));

                    break;
                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;
            }
        });
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
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDsiplay();
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
    getResult(){
        try{
        return  eval(this._operation.join(""));
        }catch(e){
            setTimeout(() => {
                            this.setError();

            }, 1);
        }
    }
    calculate() {
        let last ='';
        this._lastOperator = this.getLastItem();
        if (this._operation.length < 3)
        {
            let firsItem = this._operation[0];
            this._operation = [firsItem, this._lastOperator, this._lastNumber];
        }

        if(this._operation.length > 3)
        {
            last= this._operation.pop();
            this._lastNumber = this.getResult();

        }
        //let last = this._operation.pop();
        if(this._operation.length ==3)
        {
            this._lastNumber = this.getResult(false);
        }
        let result = this.getResult();

        if(last == '%')
        {
            result /= 100;
            this._operation = [result];

        }else{
            this._operation = [result];
            if(last) this._operation.push(last);
        }
        this.setLastNumberToDsiplay();
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
        //this.setLastNumberToDsiplay();

    }
    getLastItem(isOperator =true){
        let lastItem;
        for (let index = this._operation.length - 1; index >= 0; index--) {
            
                if (this.isOperator(this._operation[index])== isOperator) {
                    lastItem = this._operation[index];
                    break;
                }
            
           
        }
        if(!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }
        return lastItem;
    }
    
    setLastNumberToDsiplay()
    {
        let lastNumber = this.getLastItem(false);
       
        if(!lastNumber) lastNumber = 0;
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
                this.setLastOperation(newValue);
                this.setLastNumberToDsiplay();
            }
        }
        //console.log(this._operation);
    }

    setError()
    {
        this.displayCalculator="Error";
    }

    addDot()
    {
        let lastOperation = this.getLastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split(' ').indexOf('.')>-1) return;

        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.');
        }else{
            this.setLastOperation(lastOperation.toString()+'.');
        }
        this.setLastNumberToDsiplay();
    }

    executeBtn(value)
    {
        this.playAudio();
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
                this.calculate();

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
        if(value.toString.length > 10)
        {
            this.setError();
            return false;
        }
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