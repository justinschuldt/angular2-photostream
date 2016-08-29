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
    template: 
    '<h1>My First Angular 2 App</h1>' +
    '<div *ngFor="let image of images">' +
        '<div>{{image.title}}</div>' + 
        '<img src="{{image.imageUrl}}" style="height:100px">' +
        '<span *ngFor="let item of image.tags">{{item.tag}}</span>' +
    '</div>'

})
export class AppComponent {
    images: Image[]
    constructor(private azureService: AzureService) {
        azureService.someFun({email:'user@domain.com',password:'password'})
            .subscribe(
                data => {
                    console.debug('login response: ', data)
                    this.setAuth(data.token)
                    
                    azureService.getImages()
                        .subscribe(
                            data => this.images = data,
                            error => console.error('error', error)
                        )
                },
                error => console.error('login error: ', error)
            )
    }
    setAuth (token:string): void{
         this.azureService.setAuthToken(token)
    }
    getImages(): void {
        this.azureService.getImages()
            .subscribe(
                data => {
                    console.log('images data: ', data)
                //    this.images = data
                },
                error => console.error('error', error)
            )
    }
 }
