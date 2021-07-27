import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Need } from '../../../models/need.model';
import { CreateNeedModalComponent } from '../../../modals/create-need-modal/create-need-modal.component';
import { NeedService } from '../../../services/need.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-need-project-table',
  templateUrl: './need-project-table.component.html'
})
export class NeedProjectTableComponent implements OnInit {

	needs: Need[];
	
  	constructor(private needService: NeedService, 
  		private utils: UtilsService, 
  		private modalService: NgbModal) {
  	}

  	ngOnInit(): void {
		this.needService.getProjectNeeds().subscribe(data => {
			this.needs = data;
		});
  	}
  	
  	openFormModal() {
		const modalRef = this.modalService.open(CreateNeedModalComponent);
  
		modalRef.result.then((result) => {
		  console.log(result);
		}).catch((error) => {
		  console.log(error);
		});
  	}
}
