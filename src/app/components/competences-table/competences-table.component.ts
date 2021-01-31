import { Component, OnInit } from '@angular/core';
import { CompetenceService } from '../../services/competence.service';
import { Competence } from '../../models/competence.model';
import { CreateCompetenceModalComponent } from '../../modals/create-competence-modal/create-competence-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-competences-table',
  templateUrl: './competences-table.component.html'
})
export class CompetencesTableComponent implements OnInit {

	competences: Competence[];
   	constructor(private modalService: NgbModal, private competenceService: CompetenceService) { }

  	ngOnInit(): void {
  		this.competenceService.getCompetences().subscribe(data => {
			this.competences = data;
		});
	}
	
	openFormModal() {
		const modalRef = this.modalService.open(CreateCompetenceModalComponent);
	  
	  	modalRef.result.then((result) => {
		    this.competenceService.getCompetences().subscribe(data => {
		    	this.competences = data;
		    });
	  	}).catch((error) => {
	    	console.log(error);
	  	});
	}
}