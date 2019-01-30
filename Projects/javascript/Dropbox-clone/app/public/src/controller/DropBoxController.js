class DropBoxController{

    constructor(){

        this.btnSendFileElement = document.querySelector("#btn-send-file");
        this.inputFileElement = document.querySelector("#files");
        this.snackModalElement = document.querySelector('#react-snackbar-root');
        this.progessBarElement = this.snackModalElement.querySelector('.mc-progress-bar-fg');
        this.nameFileElement = this.snackModalElement.querySelector('.filename');
        this.timeLeftElement = this.snackModalElement.querySelector('.timeleft');

        this.initEvents();

    }

    initEvents(){

        this.btnSendFileElement.addEventListener('click',envent=>{

            this.inputFileElement.click();
        });

        this.inputFileElement.addEventListener('change', event=>{
            
            console.log(event.target.files);
            this.uploadTask(event.target.files);
            
            this.modalShow();

            this.inputFileElement.value = '';


        });

    }
    modalShow(show = true){
        this.snackModalElement.style.display = (show) ? 'block': 'none';

    }

    uploadTask(files){

        let promises = [];

        [...files].forEach(file=>{
            promises.push(new Promise((resolve, reject)=>{

                
                let ajax = new XMLHttpRequest();
                
                ajax.open('POST', '/upload');
                
                ajax.onload = event=>{

                    this.modalShow(false);

                    try{
                        
                        resolve(JSON.parse(ajax.responseText));
                    
                    }catch(e){

                        reject(e);

                    }
                };

                ajax.onerror =event =>{
                    this.modalShow(false);

                    reject(event);
                
                };

                ajax.upload.onprogress = event =>{
                    this.uplaodProgress(event, file);
                };
                
                let formData = new FormData();

                formData.append('input-file', file);
                
                this.startUploadTime =  Date.now();

                ajax.send(formData);


            }));
        });
        return Promise.all(promises);

    }
    uplaodProgress(event, file){
        let timespent = Date.now() - this.startUploadTime;
        let loaded = event.loaded;
        let total = event.total;
        let porcent = parseInt((loaded / total) * 100);
        let timeleft = ((100 - porcent) * timespent) / porcent;

        this.progessBarElement.style.width =`${porcent}%`;
        
        this.nameFileElement.innerHTML= file.name;
        console.log(timeleft);
        this.timeLeftElement.innerHTML = this.formatTimeToHuman(timeleft);
    }

    formatTimeToHuman(duration) {

        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if (hours > 0) {
            return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
        }

        if (minutes > 0) {
            return `${minutes} minutos e ${seconds} segundos`;
        }

        if (seconds > 0) {
            return `${seconds} segundos`;
        }

        return '';

    }
}