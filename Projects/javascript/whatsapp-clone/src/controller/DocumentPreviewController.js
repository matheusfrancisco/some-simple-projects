const pdfjsLib = require('pdfjs-dist');
const path = require('path');

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '.././dist/pdf.worker.bundle.js');

export class DocumentPreviewController{

    constructor(file)
    {
        this._file = file;

    }

    getPreviewData(){
        return new Promise((resolve , reject)=>{
            let reader = new FileReader();

            switch(this._file){

                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/git':
                reader.onload = e =>{
                    
                    resolve({
                        src: reader.result,
                        info: this._file.name
                    });

                }
                reader.onerror = e =>{
                    reject(e);
                }
                reader.readAsDataURL(this._file);

                break;

                case 'application/pdf':
                    reader.onload = event => {

                        pdfjsLib.getDocument(new Uint8Array(reader.result)).then(pdf => {

                            pdf.getPage(1).then(page => {

                                let viewport = page.getViewport(1);

                                let canvas = document.createElement('canvas');
                                let canvasContext = canvas.getContext('2d');

                                canvas.height = viewport.height;
                                canvas.width = viewport.width;

                                page.render({
                                    canvasContext,
                                    viewport
                                }).then(() => {

                                    let s = (pdf.numPages > 1) ? 's' : '';

                                    resolve({
                                        src: canvas.toDataURL('image/png'),
                                        info: `${pdf.numPages} página${s}`
                                    });

                                });

                            });

                        }).catch(event => {

                            reject({
                                error: true,
                                event
                            });

                        });

                    };

                    reader.readAsArrayBuffer(this._file);
                break;
                defaul:
                    reject();

            }

        });
    }


}