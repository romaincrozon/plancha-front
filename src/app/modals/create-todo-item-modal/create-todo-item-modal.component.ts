import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { TodoService } from '../../services/todo.service';
import { ResourceService } from '../../services/resource.service';
import { TodoCategoryService } from '../../services/todo-category.service';
import { AuthenticationService } from '../../services/authentication.service';

import { Todo } from '../../models/todo.model';
import { Status } from '../../models/status.model';
import { TodoCategory } from '../../models/todo-category.model';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-create-todo-item-modal',
  templateUrl: './create-todo-item-modal.component.html'
})
export class CreateTodoItemModalComponent implements OnInit {

  	createTodoItemForm: FormGroup;
  	todoItem: Todo;
  	status: Status[];
  	todoCategories: TodoCategory[];
  	resources: Resource[];
  	selectedCategory: TodoCategory;
  
  	constructor( public todoService: TodoService, 
		  	public resourceService: ResourceService, 
		  	public authenticationService: AuthenticationService, 
		  	public todoCategoryService: TodoCategoryService, 
  			public activeModal: NgbActiveModal, 
  			private formBuilder: FormBuilder,  ) {
    }
  	
  	ngOnInit() {
  		this.createForm();
    	this.getAllTodoCategories();
    	this.getResources();
  	}
  	
  	private getAllTodoCategories(){
		this.todoCategoryService.getTodoCategories().subscribe(data => {
			this.todoCategories = data;
		});
  	}
  	
  	private getResources(){
		this.resourceService.getAll().subscribe(data => {
			this.resources = data;
		});
  	}
  	  	
  	private createForm() {
    	this.createTodoItemForm = this.formBuilder.group({
      		name: new FormControl(),
      		detail: new FormControl(),
    		deadline: new FormControl(),
    		recurrence: new FormControl(),
    		todoItemCategory: new FormControl(),
    		affectedTo: new FormControl(),
		});
  	}
  
  	private submitForm() {
  		var todoItemToCreate = new Todo(this.createTodoItemForm.value);
  		todoItemToCreate.createdBy = this.authenticationService.currentResourceValue;
  		todoItemToCreate.creationDate = new Date().toDateString();
		console.log(todoItemToCreate);
		this.todoService.createTodo(todoItemToCreate).subscribe(data => {
			this.todoItem = data;
		});
	    this.activeModal.close();
  	}
}