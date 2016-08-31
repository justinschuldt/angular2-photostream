import { Component } from '@angular/core';
import { AzureService } from './azureService/azure.service'

export interface Tag {
        id: string;
        tag: string;
    }
export interface Image {
        id: string;
        createdAt: string;
        title: string;
        imageUrl: string;
        usersId: string;
        tags: Tag[]
    }

@Component({
    selector: 'my-app',
    template:`
    <app-title [subtitle]="subtitle"></app-title>
    <nav>
      <a routerLink="welcome" routerLinkActive="active">Welcome</a>
      <a routerLink="sample"  routerLinkActive="active">Sample Module</a>
      <a routerLink="image"  routerLinkActive="active">Image Module</a>
    </nav>
    <router-outlet></router-outlet>`
})
export class AppComponent {
    subtitle = 'interpolated text goodness!';
    images: Image[]
    constructor(private azureService: AzureService) {
        azureService.api('login').post({email:'user@domain.com',password:'password'})
            .subscribe(
                data => {
                    // set a token for all future requests
                    console.log('this is still happening: ', data)
                    azureService.setAuthToken(data.token)
                    // now that our service has a token,
                    // call a protected api to get some data
                    this.getImages();
                },
                error => console.error('login error: ', error)
            )
    }
    setAuth (token:string): void{
         
    }
    getImages(): void {
        this.azureService.table('images').getAll()
            .subscribe(
                data => this.images = data,
                error => console.error('error', error)
            )
    }
 }
