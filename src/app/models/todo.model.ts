import {Deserializable} from './deserializable.model';

import {Status} from './status.model';
import {Resource} from './resource.model';

export class Todo implements Deserializable {

  	public id: number;
    public name: string;
    public detail: string;
    public creationDate: string;
    public deadline: string;
    public recurrence: number; //every day, every week
    public status: number;
    public todoItemCategory: number;
    public createdBy: any;
    public affectedTo: any;

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