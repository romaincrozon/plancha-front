import { DatePipe } from '@angular/common'

export class CalendarRange {
  
  	startDate : string | null;
  	endDate : string | null;

	constructor(datepipe: DatePipe, startDate: string, endDate: string) {
		if (datepipe != null){
			this.startDate = datepipe.transform(startDate, 'yyyy-MM-dd');
			this.endDate = datepipe.transform(endDate, 'yyyy-MM-dd');
  		} else {
			this.startDate = startDate;
			this.endDate = endDate;  		
  		}
  	}
  	
}