import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html'
})
export class AdministrationComponent implements OnInit {

	public profiles: Profile[];
  	
  	constructor(private profileService : ProfileService ) {
		
	}

  	ngOnInit(): void {
  		this.profileService.getProfiles().subscribe(data => {
			this.profiles = data;
		});
  	}

}
