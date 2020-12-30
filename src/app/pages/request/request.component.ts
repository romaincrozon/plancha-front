import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Observable, of, from, interval } from 'rxjs';
import { Location } from '@angular/common';

import { RequestService } from '../../services/request/request.service';

import { Request } from '../../models/request.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit {

	id: string;
  	updateRequestForm: FormGroup;
	request: Request;
  	
  	constructor(public requestService: RequestService, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
  		this.createForm();
  	}

  	ngOnInit() : void{
  		this.getRequest().subscribe(
      		currentRequest => this.request = currentRequest
    	);
		
  	}
  
  	getRequest() : Observable<Request>{
		this.activatedRoute.paramMap.subscribe(params => {
	      	this.id = params.get('id');
		});	  
		  	
		this.requestService.getRequestById(this.id).subscribe(data => {
			this.request = data;
		});
	    return of(this.request);	
	}
	
	private createForm() {
	    this.updateRequestForm = this.formBuilder.group({
	      	daysPerWeek: new FormControl(),
  			totalDays: new FormControl(),
  			beginDate: new FormControl(),
  			endDate: new FormControl(),
  			project: new FormControl(),
  			profile: new FormControl(),

	    });
	}
	
	private submitForm() {
		if (this.id != null){
		    var requestToUpdate = new Request(this.updateRequestForm.value);
		    //requestToUpdate.id = this.id;
		    this.requestService.updateRequest(requestToUpdate).subscribe(data => {
				this.request = data;
			});
		}else{
			console.log("Error");
		}
	}

}
