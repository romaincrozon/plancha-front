import { Injectable } from '@angular/core';
import { AvailabilityService } from './availability.service';
import { NeedService } from './need.service';
import { ProfileService } from './profile.service';
import { ProjectService } from './project.service';
import { RequestService } from './request.service';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {

  	constructor(public availabilityService: AvailabilityService,
      public profileService: ProfileService,
      public projectService: ProjectService,
      public requestService: RequestService,
      public needService: NeedService,
      public resourceService: ResourceService ) {
    }

    loadData(){
      
    }


    
}
