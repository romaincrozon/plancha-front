import { Component, OnInit, Input } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

import { AuthenticationService } from '../../services/authentication.service';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html'
})

export class ProfileSettingsComponent implements OnInit {

	resource: Resource;

  	constructor(private authenticationService: AuthenticationService) { 
  	}

  	ngOnInit(): void {
  		this.resource = this.authenticationService.currentResourceValue;
  	}
}