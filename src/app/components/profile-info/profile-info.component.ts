import { Component, OnInit, Input } from '@angular/core';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html'
})
export class ProfileInfoComponent implements OnInit {

	@Input() resource: Resource;

  	constructor() { 
  	}

  	ngOnInit(): void {
  	
  	}

}
