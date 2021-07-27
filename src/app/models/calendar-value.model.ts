import {Deserializable} from './deserializable.model';

export class CalendarValue implements Deserializable {
  	public calendar: string;
  	public value: number;

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