import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateTodoItemModalComponent } from '../../modals/create-todo-item-modal/create-todo-item-modal.component';
import { TodoService } from '../../../services/todo.service';
import { ResourceService } from '../../../services/resource.service';
import { UtilsService } from '../../../services/utils.service';
import { Todo } from '../../../models/todo.model';
import { Resource } from '../../../models/resource.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
 
@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html'
})
export class TodoTableComponent implements OnInit {

	todoItemsAffectedToMe: Todo[];
	todoItemsAffectedToOthers: Todo[];
	//resources: Resource[];
	
  	constructor(private todoService: TodoService, 
  		private resourceService: ResourceService, 
		public authenticationService: AuthenticationService, 
  		private modalService: NgbModal,
  		private utils: UtilsService) { }

  	ngOnInit(): void {
	  	this.getData();
  	}

  	getData(){
		console.log("user: " + this.authenticationService.currentResourceValue.id)
		this.todoService.getTodoItems().subscribe(todoItems => {
			this.resourceService.getAll().subscribe(resources => {
				todoItems.forEach(function(todoItem) {
				    todoItem.affectedTo = resources.find(resource => resource.id == todoItem.affectedTo);
				    todoItem.createdBy = resources.find(resource => resource.id == todoItem.createdBy);
				});
				this.todoItemsAffectedToMe = todoItems.filter(todoItem => todoItem.affectedTo.id == this.authenticationService.currentResourceValue.id);
				this.todoItemsAffectedToOthers = todoItems.filter(todoItem => todoItem.affectedTo.id != this.authenticationService.currentResourceValue.id);
				console.log(this.todoItemsAffectedToMe )
				console.log(this.todoItemsAffectedToOthers )
			});
		});
  	}
  	
  	toggleStatus(todoItem){
  		console.log(todoItem);
  		if (todoItem.status < 3){
  			todoItem.status += 1; 
  		}else{
  			todoItem.status = 1; 
  		}
  		this.todoService.updateTodoItem(todoItem).subscribe(data => {
			todoItem = data;
		});
  	}
  	
  	openFormModal(todoItem) {
		const modalRef = this.modalService.open(CreateTodoItemModalComponent);
  		modalRef.componentInstance.todoItem = todoItem;
		
		modalRef.result.then((result) => {
		  this.getData();
		}).catch((error) => {
		  console.log(error);
		});
  	}
  	
  	getProgress(creationDate: string, deadline: string): Object {
  		let totalDuration = new Date(deadline).getTime() - new Date(creationDate).getTime();
  		let ratio = (((new Date().getTime() - new Date(creationDate).getTime()) / totalDuration) * 100).toFixed(0);
  		let styles = {            
        	'background': 'linear-gradient(90deg, lightskyblue ' + ratio + '%, gainsboro 0%)'
    	};
    	return styles;  
  	}

}
