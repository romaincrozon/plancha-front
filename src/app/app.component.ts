import { Component } from "@angular/core";
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { Resource } from './models/resource.model';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Plancha";

  currentResource: Resource;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
        this.authenticationService.currentResource.subscribe(x => this.currentResource = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}