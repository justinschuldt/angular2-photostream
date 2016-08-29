import { Component } from '@angular/core';
import { AzureService } from './azureService/azure.service'
@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
export class AppComponent {
    constructor(azureService: AzureService) {
        console.debug(azureService.someFun('yeah'))
    }
 }
