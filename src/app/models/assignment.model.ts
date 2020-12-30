import {Deserializable} from './deserializable.model';
import {Request} from './request.model';
import {Resource} from './resource.model';

export class Assignment implements Deserializable {
  
  	public id: number;
  	public daysPerWeek: number;
  	public beginDate: string;
  	public endDate: string;
  	public request: Request;
  	public resource: Resource;

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