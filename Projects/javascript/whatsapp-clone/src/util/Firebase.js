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
        if(!window._initializedFirebase){

            firebase.initializeApp(this._config);
            /*because is true for default in new version */
            /*firebase.firestore().settings({
                timestampsInSnapshots: true
            });*/

            window._initializedFirebase= true;

        }
    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();
    }

    initAuth(){

        return new Promise((s,f)=>{
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result=>{ 

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user,token
                 });

            }).catch(err=>{
                f(err); 
            })
        });

    }

}
