import {Deserializable} from './deserializable.model';

export class NeedProject implements Deserializable {

	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  
  	deserialize(input: any): this {
    	Object.assign(this, input);
    	return this;
  	}
}
