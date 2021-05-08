import {Deserializable} from './deserializable.model';
import {SubProject} from './sub-project.model';
import {Resource} from './resource.model';
import {Request} from './request.model';

export class Competence implements Deserializable {
  
  	public id: number;
  	public name: string;
  	public status: string;
  	public resources: Resource[];
  	public requests: Request[];
	
	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  	
  	deserialize(input: any): this {
    	Object.assign(this, input);

		this.resources = input.resources != null ? input.resources.map(resource => new Resource().deserialize(resource)) : null;
		this.requests = input.requests != null ? input.requests.map(request => new Request().deserialize(request)) : null;

    	return this;
  	}
}