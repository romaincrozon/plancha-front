import {Deserializable} from './deserializable.model';

export class Todo implements Deserializable {

  	public id: number;
    public name: string;
    public detail: string;
    public deadline: string;
    public recurrence: number;//every day, every week
    public status: number;
    public category: number;

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