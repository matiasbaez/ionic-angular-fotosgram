import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { PostsResponse, Post } from '../interfaces/interfaces';
import { UserService } from './user.service';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postPage = 0;
  newPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  getPosts(pull: boolean = false) {
    if (pull) { this.postPage = 0; }
    this.postPage++;
    return this.http.get<PostsResponse>(`${API}/posts/?page=${this.postPage}`);
  }

  createPost(data) {
    const headers = new HttpHeaders({'x-token': this.userService.token});
    return new Promise(resolve => {
      this.http.post(`${API}/posts`, data, {headers}).subscribe(
        (response: any) => {
          console.log('response: ', response);
          if (response.success) {
            this.newPost.emit(response.post);
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  uploadImage(image) {
    const headers = new HttpHeaders().set('x-token', this.userService.token);
    const formData = new FormData();
    formData.append('image', image);

    this.http.post(`${API}/posts/upload`, formData, { headers })
    .subscribe(
      response => console.log(response),
      err => console.log('Error al subir la imagen: ', err)
    );
  }

}
