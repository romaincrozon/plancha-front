import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { TodoService } from '../../../services/todo.service';
import { ResourceService } from '../../../services/resource.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { UtilsService } from '../../../services/utils.service';

import { Todo } from '../../../models/todo.model';
import { Status } from '../../../models/status.model';
import { Resource } from '../../../models/resource.model';

@Component({
  selector: 'app-create-todo-item-modal',
  templateUrl: './create-todo-item-modal.component.html'
})
export class CreateTodoItemModalComponent implements OnInit {

  	createTodoItemForm: FormGroup;
  	todoItem: Todo;
  	status: Status[];
  	todoCategories: string[];
  	resources: Resource[];
  	selectedCategory: number;
  
  	constructor( public todoService: TodoService, 
		  	public resourceService: ResourceService, 
		  	public authenticationService: AuthenticationService, 
		  	public utils: UtilsService, 
  			public activeModal: NgbActiveModal, 
  			private formBuilder: FormBuilder,  ) {
    }
  	
  	ngOnInit() {
  		this.createForm();
    	this.getResources();
    	
  		this.todoCategories = this.utils.getProperty('todo', 'categories', null);
  	}
  	
  	private getResources(){
		this.resourceService.getAll().subscribe(data => {
			this.resources = data;
		});
  	}
  	  	
  	private createForm() {
    	this.createTodoItemForm = this.formBuilder.group({
      		name: [this.todoItem?.name, Validators.required],
      		detail: [this.todoItem?.detail],
      		deadline: [this.todoItem?.deadline],
    		affectedTo: [this.todoItem?.affectedTo.id, Validators.required],
			recurrence: [this.todoItem?.recurrence],
    		todoItemCategory: [this.todoItem?.todoItemCategory],
    	});
  	}
  
  	private submitForm() {
  		if (this.todoItem){
  			let o = Object.assign(this.todoItem, this.createTodoItemForm.value);
  			
  			console.log("sdg");
			console.log(o);
			this.todoService.updateTodoItem(this.todoItem).subscribe(data => {
				this.activeModal.close(data);
			});
		} else {
	  		var todoItemToCreate = new Todo(this.createTodoItemForm.value);
	  		todoItemToCreate.createdBy = this.authenticationService.currentResourceValue;
	  		todoItemToCreate.creationDate = this.utils.formatDate(new Date().toDateString());  		
	
			console.log(todoItemToCreate);
			this.todoService.createTodo(todoItemToCreate).subscribe(data => {
				this.activeModal.close(data);
			});
			
		}	    
  	}
}