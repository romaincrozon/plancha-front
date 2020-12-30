import {Deserializable} from './deserializable.model';
import {Resource} from './resource.model';

export class Need implements Deserializable {
  
  	public id: number;
  	public resources: Resource[];

	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  
  	deserialize(input: any): this {
    	Object.assign(this, input);

		this.resources = input.resources != null ? input.resources.map(resource => new Resource().deserialize(resource)) : null;

    	return this;
  	}
}