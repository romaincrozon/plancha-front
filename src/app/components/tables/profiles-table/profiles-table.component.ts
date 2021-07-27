import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../models/profile.model';
import { CreateProfileModalComponent } from '../../../modals/create-profile-modal/create-profile-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profiles-table',
  templateUrl: './profiles-table.component.html'
})
export class ProfilesTableComponent implements OnInit {

	profiles: Profile[];
	constructor(private modalService: NgbModal, private profileService: ProfileService) { }

	ngOnInit(): void {
	  	this.profileService.getProfiles().subscribe(data => {
			this.profiles = data;
		});
	}
  
  	openFormModal() {
		const modalRef = this.modalService.open(CreateProfileModalComponent);
	  
	  	modalRef.result.then((result) => {
		    this.profileService.getProfiles().subscribe(data => {
				this.profiles.push(result);
		    });
	  	}).catch((error) => {
	    	console.log(error);
	  	});
	}
}
