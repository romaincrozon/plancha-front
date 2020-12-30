import {Deserializable} from './deserializable.model';
import {Project} from './project.model';
import {Task} from './task.model';

export class SubProject implements Deserializable {
  
  	public id: string;
  	public name: string;
  	public status: string;
  	public project: Project;
  	public tasks: Task[];

	constructor(input?: any) {
    	if (input) {
	  		this.deserialize(input);
    	}
  	}
  	
  	deserialize(input: any): this {
    	Object.assign(this, input);
		console.log(this);
    	this.tasks = input.tasks != null ? input.tasks.map(task => new Task().deserialize(task)) : null;

    	return this;
  	}
}