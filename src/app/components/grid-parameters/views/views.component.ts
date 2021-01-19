import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html'
})
export class ViewsComponent implements OnInit {

	@Input() parentForm:FormGroup;
  	
  	constructor(private fb:FormBuilder) {
  	}

  	ngOnInit(): void {}

}
