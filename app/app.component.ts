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
    <router-outlet></router-outlet>
    `
    // '<h1>My First Angular 2 App</h1>' +
    // '<div *ngFor="let image of images">' +
    //     '<h3>{{image.title}}</h3>' + 
    //     '<img src="{{image.imageUrl}}" style="height:100px">' +
    //     '<div>{{image.createdAt | date}}</div>' +
    //     '<div>Tags: ' +
    //         '<span *ngFor="let item of image.tags">{{item.tag}} </span>' +
    //     '</div>' +
    // '</div>'

})
export class AppComponent {
    subtitle = 'interpolated text goodness!';
    images: Image[]
    constructor(private azureService: AzureService) {
        azureService.api('login').post({email:'user@domain.com',password:'password'})
            .subscribe(
                data => {
                    // set a token for all future requests
                    this.azureService.setAuthToken(data.token)
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
