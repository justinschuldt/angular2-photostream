import { Injectable } from '@angular/core';
import { AzureService } from '../azureService/azure.service'
import 'rxjs/add/operator/filter'

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


@Injectable()
export class ImageService {
  images: Image[]
  constructor(
    private azureService: AzureService
  ) { }

  getImages() {
    return this.azureService.table('images').getAll();
  }

  getImage(id: string) {
    return this.getImages().filter(item => item.id === id);
  }

}