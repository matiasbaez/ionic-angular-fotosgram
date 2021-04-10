import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { UIService } from 'src/app/services/ui.service';

import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userLogin = {
    email: '',
    password: ''
  };

  userRegister: User = {
    email: '',
    password: '',
    name: '',
    avatar: 'av-1.png'
  };

  @ViewChild('mainSlide') slides: IonSlides;

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private uiService: UIService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.slides) this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) { return; }

    const valid = await this.userService.login(this.userLogin);
    if (valid) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.alertInfo('Usuario y/o contraseña no son correctas');
    }
  }

  async register(fRegister: NgForm) {
    if (fRegister.invalid) { return; }

    const valid = await this.userService.register(this.userRegister);
    if (valid) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.uiService.alertInfo('Ese correo electronico ya existe.');
    }
  }

  showLoginRegister(event) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(event);
    this.slides.lockSwipes(true);
  }

}
