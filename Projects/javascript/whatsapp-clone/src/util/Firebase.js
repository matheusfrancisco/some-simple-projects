const firebase = require('firebase');
require('firebase/firestore');



export class Firebase {

    constructor(){

        this._config = {
                apiKey: "AIzaSyAV0hIsj0RiS7Eh7oKovrbVHGlm9nrksVo",
                authDomain: "whatsapp-clone-matheus.firebaseapp.com",
                databaseURL: "https://whatsapp-clone-matheus.firebaseio.com",
                projectId: "whatsapp-clone-matheus",
                storageBucket: "whatsapp-clone-matheus.appspot.com",
                messagingSenderId: "384231751563"
              };

        this.init();
    }

    init(){
        if(!this._initialized){

            firebase.initializeApp(this._config);
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            this._initilized= true;

        }
    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();
    }
}
