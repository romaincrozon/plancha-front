import {Deserializable} from './deserializable.model';

export class TaskResource implements Deserializable {
  
  	public resourceId: number;
  	public taskId: number;

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