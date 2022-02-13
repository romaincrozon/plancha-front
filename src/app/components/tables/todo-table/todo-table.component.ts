import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateTodoItemModalComponent } from '../../modals/create-todo-item-modal/create-todo-item-modal.component';
import { TodoService } from '../../../services/todo.service';
import { ResourceService } from '../../../services/resource.service';
import { UtilsService } from '../../../services/utils.service';
import { Todo } from '../../../models/todo.model';
import { Resource } from '../../../models/resource.model';
 
@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html'
})
export class TodoTableComponent implements OnInit {

	todoItems: Todo[];
	//resources: Resource[];
	
  	constructor(private todoService: TodoService, 
  		private resourceService: ResourceService, 
  		private modalService: NgbModal,
  		private utils: UtilsService) { }

  	ngOnInit(): void {
	  	this.getData();
  	}

  	getData(){
		this.todoService.getTodoItems().subscribe(data => {
			this.todoItems = data;
			console.log(this.todoItems);
			this.resourceService.getAll().subscribe(data => {
				var resources = data;
				this.todoItems.forEach(function(todoItem) {
				    todoItem.affectedTo = resources.find(resource => resource.id == todoItem.affectedTo);
				    todoItem.createdBy = resources.find(resource => resource.id == todoItem.createdBy);
				});
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
