import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html'
})
export class TodoTableComponent implements OnInit {

	todoItems: Todo[];
	
  	constructor(private todoService: TodoService) { }

  	ngOnInit(): void {
	  	this.getTodoItems();
  	}

  	getTodoItems(){
		console.log("Get todo items");
		this.todoService.getTodoItems().subscribe(data => {
			this.todoItems = data;
		});
  	}

}
