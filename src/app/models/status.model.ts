import { Deserializable } from './deserializable.model';

export class Status implements Deserializable {

  	public id: number;
    public name: string;
	public className: string;
	
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