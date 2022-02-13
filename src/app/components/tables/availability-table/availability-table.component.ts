import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Availability } from '../../../models/availability.model';
import { CreateAvailabilityModalComponent } from '../../modals/create-availability-modal/create-availability-modal.component';
import { AvailabilityService } from '../../../services/availability.service';
import { CalendarService } from '../../../services/calendar.service';
import { UtilsService } from '../../../services/utils.service';
import { ResourceService } from '../../../services/resource.service';

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html'
})
export class AvailabilityTableComponent implements OnInit {

  	availabilities: Availability[];
	
  	constructor(private availabilityService: AvailabilityService,
  		private utils: UtilsService, 
  		private modalService: NgbModal) {
  	}

  	ngOnInit(): void {
		this.availabilityService.getAvailabilities().subscribe(data => {
			this.availabilities = data;
		});
  	}

  	openFormModal() {
		const modalRef = this.modalService.open(CreateAvailabilityModalComponent);
  
		modalRef.result.then((result) => {
		  console.log(result);
		}).catch((error) => {
		  console.log(error);
		});
  	}
}
