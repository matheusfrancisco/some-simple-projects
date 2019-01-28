class DropBoxController{

    constructor(){

        this.btnSendFileElement = document.querySelector("#btn-send-file");
        this.inputFileElement = document.querySelector("#files");
        this.snackModalElement = document.querySelector('#react-snackbar-root');



        this.initEvents();

    }

    initEvents(){

        this.btnSendFileElement.addEventListener('click',envent=>{

            this.inputFileElement.click();
        });

        this.inputFileElement.addEventListener('change', event=>{
            
            console.log(event.target.files);
            this.uploadTask(event.target.files);
            
            this.snackModalElement.style.display = 'block';

        });

    }

    uploadTask(files){

        let promises = [];

        [...files].forEach(file=>{
            promises.push(new Promise((resolve, reject)=>{

                
                let ajax = new XMLHttpRequest();
                
                ajax.open('POST', '/upload');
                
                ajax.onload = event=>{
                    try{
                        
                        resolve(JSON.parse(ajax.responseText));
                    
                    }catch(e){

                        reject(e);

                    }
                };

                ajax.onerror =event =>{

                    reject(event);
                
                };

                let formData = new FormData();

                formData.append('input-file', file);
                
                ajax.send(formData);


            }));
        });
        return Promise.all(promises);

    }

}