import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  	constructor() { }
  
	getObjectById(array, id){
		if (array != null && id != null){
			return array.find(node => node.id == id);
		}
		return null;
	}
}
