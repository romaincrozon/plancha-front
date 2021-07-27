import { Component, OnInit } from '@angular/core';
import { Availability } from '../../../models/availability.model';
import { AvailabilityService } from '../../../services/availability.service';
import { CalendarService } from '../../../services/calendar.service';

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html'
})
export class AvailabilityTableComponent implements OnInit {

  	availabilities: Availability[];
	
  	constructor(public availabilityService: AvailabilityService) {
  	}

  	ngOnInit(): void {
		this.availabilityService.getAvailabilities().subscribe(data => {
			this.availabilities = data;
			console.log(this.availabilities);
		});
  	}

}
