import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const API = environment.api;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, userId: string): string {
    return `${API}/posts/image/${userId}/${image}`;
  }

}
