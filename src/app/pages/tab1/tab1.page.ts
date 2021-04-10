import { Component } from '@angular/core';

import { PostsService } from 'src/app/services/posts.service';

import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public posts: Post[] = [];
  public infScrollDisabled = false;

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.nextPage();
    this.postsService.newPost.subscribe(post => {
      this.posts.unshift(post);
    });
  }

  nextPage(event?, pull: boolean = false) {
    this.postsService.getPosts(pull).subscribe(
      (response) => {
        this.posts.push(...response.posts);
        if (event) {
          event.target.complete();

          if (response.posts.length === 0) { this.infScrollDisabled = true; }
        }
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }

  refresh(event) {
    this.nextPage(event, true);
    this.posts = [];
    this.infScrollDisabled = false;
  }

}
