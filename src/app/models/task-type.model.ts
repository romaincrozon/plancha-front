import { Deserializable } from './deserializable.model';

export class TaskType implements Deserializable {

  	public id: string;
  	public type: string;
  	
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
