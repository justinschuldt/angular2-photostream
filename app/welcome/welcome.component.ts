import { Component, OnInit }      from '@angular/core';

import { User, WelcomeService } from './welcome.service';
import { UserService }             from '../core/user.service';

import 'rxjs/add/operator/filter';

@Component({
    templateUrl: 'app/welcome/welcome.component.html',
    styleUrls: ['app/welcome/welcome.component.css']
})
export class WelcomeComponent implements OnInit {
    email: string = 'user@domain.com';
    password: string

    emailFound: boolean = null;
    
    // TODO update CoreModule, TitleComponent & UserService to use email
    userName: string;

    constructor(
        private welcomeService: WelcomeService,
        userService: UserService
    ) {
        // userService will have ran before this runs
        this.userName = userService.userName;
    }

    ngOnInit() {
        // maybe grab the previously logged in user's email and...?
    }
    checkEmail(email: string) {
        console.debug(email);
        this.welcomeService.checkForEmail(email)
            .subscribe(
                data => {
                    console.log('data: ', data);
                    if (data.length === 1){
                        //email was found, go to password input
                        this.emailFound = true;

                    } else {
                        //email was not found, go to create password
                        this.emailFound = false;
                    }
                }
            )
    }
    createAccount(email: string, password: string) {
        this.welcomeService.signUp(email, password)
            .subscribe(
                data => {
                    console.log('token: ', data.token);
                    this.welcomeService.setAuthToken(data.token);
                    // nav.push or whatever
                }
            )
    }
    login(email: string, password: string){
        this.welcomeService.login(email, password)
            .subscribe(
                data => {
                    console.log('token: ', data.token);
                    this.welcomeService.setAuthToken(data.token);
                    // nav.push or whatever
                }
            )
    }

}