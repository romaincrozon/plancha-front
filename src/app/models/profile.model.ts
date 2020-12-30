import {Deserializable} from './deserializable.model';
import {Competence} from './competence.model';
import {Resource} from './resource.model';
import {Request} from './request.model';

export class Profile implements Deserializable {
  
  	public id: number;
  	public name: string;
  	public competenceList: Competence[];
  	public resources: Resource[];
  	public requests: Request[];

	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  
  	deserialize(input: any): this {
    	Object.assign(this, input);
	    this.competenceList = input.competences != null ? input.competences.map(competence => new Competence().setId(competence)) : null;
		this.resources = input.resources != null ? input.resources.map(resource => new Resource().deserialize(resource)) : null;
		this.requests = input.requests != null ? input.requests.map(request => new Request().deserialize(request)) : null;
		console.log("Competences: " + this.competenceList);
	    return this;
  	}
}