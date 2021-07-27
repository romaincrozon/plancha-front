import { Component, OnInit } from '@angular/core';
import { Need } from '../../../models/need.model';
import { NeedService } from '../../../services/need.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-need-team-table',
  templateUrl: './need-team-table.component.html'
})

export class NeedTeamTableComponent implements OnInit {

	needs: Need[];
	
  	constructor(public needService: NeedService, public utils: UtilsService) {
  	}

  	ngOnInit(): void {
		this.needService.getTeamNeeds().subscribe(data => {
			this.needs = data;
		});
  	}
}
