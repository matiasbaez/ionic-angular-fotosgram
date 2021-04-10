import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';
import { UIService } from 'src/app/services/ui.service';

import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: User = {};

  constructor(
    private postService: PostsService,
    private userService: UserService,
    private uiService: UIService,
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  async updateUser(fUpdate: NgForm) {
    if (fUpdate.invalid) { return; }

    const updated = await this.userService.updateUser(this.user);
    if (updated) {
      this.uiService.presentToast('Datos de perfil actualizado');
    } else {
      this.uiService.presentToast('No se puedo actualizar');
    }
  }

  logout() {
    this.userService.logout();
    this.postService.postPage = 0;
  }

}
