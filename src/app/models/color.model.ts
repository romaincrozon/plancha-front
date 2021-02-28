import { Deserializable } from './deserializable.model';

export class Color implements Deserializable {

  	public id: string;
  	public color: string;
  	
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
