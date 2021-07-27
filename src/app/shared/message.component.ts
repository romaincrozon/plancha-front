import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-message',
  template: '{{message}}',
})
export class MessageComponent implements OnInit {

  constructor(private utils: UtilsService) { }

  @Input() message;
  @Input() feature;
  @Input() item;

  ngOnInit(): void {
  	this.message = this.utils.getProperty(this.message, this.feature, this.item);
  }

}