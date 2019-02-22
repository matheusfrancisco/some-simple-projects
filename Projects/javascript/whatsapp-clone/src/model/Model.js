import { ClassEvent  } from "../util/ClassEvent";

export class Model extends ClassEvent{

    constructor(){
        super();

        this._data= {};

    }

    fromJSON(json){

        this._data = Object.assing(this._data,json);

        this.trigger('datachange',this.toJSON());
    }

    toJSON(){

        return this._data; 

    }

}
