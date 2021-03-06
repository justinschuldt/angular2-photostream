import { Injectable } from '@angular/core';
import { AzureService } from '../azureService/azure.service'
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap'

export interface User {
    id: string;
    createdAt: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
}

@Injectable()
export class WelcomeService {
    constructor(private azureService:AzureService) { }

  checkForEmail(email: string) {
    return this.azureService.table('users').where({email: email});
  }

  login(email: string, password: string) {
    let obj = {email: email, password: password};
    return this.azureService.api('login').post(obj);
  }

  signUp(email: string, password: string) {
    let obj = {email: email, password: password};
    return this.azureService.api('login').put(obj);
  }
  setAuthToken(token: string) {
      this.azureService.setAuthToken(token);
  }
}