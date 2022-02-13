import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { CompetenceService } from '../../../services/competence.service';
import { Competence } from '../../../models/competence.model';

@Component({
  selector: 'app-create-competence-modal',
  templateUrl: './create-competence-modal.component.html'
})

export class CreateCompetenceModalComponent {

  createCompetenceForm: FormGroup;
  competence: Competence;
  
  constructor( public competenceService: CompetenceService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder,  ) {
    this.createForm();
  }

  private createForm() {
    this.createCompetenceForm = this.formBuilder.group({
      name: new FormControl(),
    });
  }
  private submitForm() {
  	const result: Competence = Object.assign({}, this.createCompetenceForm.value);
    this.competenceService.createCompetence(result).subscribe(data => {
		this.competence = data;
	});
    this.activeModal.close();
  }
}