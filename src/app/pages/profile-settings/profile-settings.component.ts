import {Component, OnInit, NgModule,Input,ComponentFactory,ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {AlertComponent} from '../../components/alert/alert.component';

@Component({
  selector: 'app-profile-settings',
  template: `
    <template #alertContainer></template>
    <button (click)="createComponent('success')">Create success alert</button>
    <button (click)="createComponent('danger')">Create danger alert</button>
  `,
})

export class ProfileSettingsComponent implements OnInit {

 	@ViewChild("alertContainer", { read: ViewContainerRef }) container;
	componentRef: ComponentRef<any>;
  
  	constructor(private resolver: ComponentFactoryResolver) {}

  	ngOnInit(): void {
  	}

	createComponent(type) {
    	this.container.clear();
    	const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(AlertComponent);
    	this.componentRef = this.container.createComponent(factory);
    	this.componentRef.instance.type = type;
	}

    ngOnDestroy() {
		this.componentRef.destroy();    
    }
}