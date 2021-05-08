import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, from, interval } from 'rxjs';

import { CompetenceService } from '../../services/competence.service';
import { ProfileService } from '../../services/profile.service';
import { RequestService } from '../../services/request.service';
import { Profile } from '../../models/profile.model';
import { Competence } from '../../models/competence.model';

@Component({
  selector: 'app-create-profile-modal',
  templateUrl: './create-profile-modal.component.html'
})
export class CreateProfileModalComponent {

  	createProfileForm: FormGroup;
  	profile: Profile;
  	competences: Competence[];
  
  	constructor( public profileService: ProfileService, public competenceService: CompetenceService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    	this.createForm();
  	}
  
  	ngOnInit() {
  		this.getCompetences().subscribe(
      		competences => this.competences = competences
    	);
  	}
  	
  	getCompetences() : Observable<Competence[]>{
		this.competenceService.getCompetences().subscribe(data => {
			this.competences = data;
		});
	   return of(this.competences);	
	}
  
  	private createForm() {
    	this.createProfileForm = this.formBuilder.group({
      		name: '',
      		competences: [],
		});
	}
  
  	private submitForm() {
    	var profile = new Profile(this.createProfileForm.value);

		console.log(profile);
    	this.profileService.createProfile(profile).subscribe(data => {
			this.profile = data;
		});
    	this.activeModal.close();
  	}
}