import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateTodoItemModalComponent } from '../../../modals/create-todo-item-modal/create-todo-item-modal.component';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo.model';
 
@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html'
})
export class TodoTableComponent implements OnInit {

	todoItems: Todo[];
	
  	constructor(private todoService: TodoService, private modalService: NgbModal) { }

  	ngOnInit(): void {
	  	this.getTodoItems();
  	}

  	getTodoItems(){
		console.log("Get todo items");
		this.todoService.getTodoItems().subscribe(data => {
			this.todoItems = data;
		});
  	}
  	
  	openFormModal() {
		const modalRef = this.modalService.open(CreateTodoItemModalComponent);
  
		modalRef.result.then((result) => {
		  console.log(result);
		  this.getTodoItems();
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
