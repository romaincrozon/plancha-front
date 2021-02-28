import {Deserializable} from './deserializable.model';
import {SubProject} from './sub-project.model';
import {Resource} from './resource.model';
import {Request} from './request.model';
import {Color} from './color.model';

export class Project implements Deserializable {
  
  	public id: string;
  	public name: string;
  	public status: string;
  	public confidencePercentage: number;
  	public subprojects: SubProject[];
  	public resources: Resource[];
  	public requests: Request[];
  	public selected: boolean = true;
  	
	public soldWorkload: number;
	public challengedWorkload: number;
	public consumedWorkload: number;
	public projectMargin: number;
	public color: Color;

	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  	
  	deserialize(input: any): this {
    	Object.assign(this, input);

   		this.subprojects = input.subprojects != null ? input.subprojects.map(subproject => new SubProject().deserialize(subproject)) : null;
		this.resources = input.resources != null ? input.resources.map(resource => new Resource().deserialize(resource)) : null;
		this.requests = input.requests != null ? input.requests.map(request => new Request().deserialize(request)) : null;
    	return this;
  	}
}