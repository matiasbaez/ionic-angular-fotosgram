import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../interfaces/interfaces';

import { environment } from '../../environments/environment';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  private user: User = null;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  login(data) {
    return new Promise( resolve => {
      this.http.post(`${API}/user/login`, data).subscribe(
        async (response: any) => {
          console.log('response: ', response);
          if (response.success) {
            await this.saveToken(response.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        }
      );
    });
  }

  register(data: User) {
    return new Promise(resolve => {
      this.http.post(`${API}/user/create`, data).subscribe(
        async (response: any) => {
          console.log('response: ', response);
          if (response.success) {
            await this.saveToken(response.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        }
      );
    });
  }

  getUser() {
    if (!this.user._id) {
      this.validateToken();
    }
    return { ...this.user };
  }

  updateUser(data: User) {
    const headers = new HttpHeaders({'x-token': this.token});
    return new Promise(resolve => {
      this.http.post(`${API}/user/update`, data, {headers}).subscribe(
        async (response: any) => {
          if (response.success) {
            await this.saveToken(response.token);
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  logout() {
    this.token = null;
    this.user = null;
    this.storage.clear();
    // this.validateToken();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
    await this.validateToken();
  }

  async loadToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validateToken(): Promise<boolean> {
    await this.loadToken();
    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {
      const headers = new HttpHeaders({'x-token': this.token});
      this.http.get(`${API}/user`, {headers}).subscribe(
        (response: any) => {
          if (response.success) {
            this.user = response.user;
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        }
      );
    });
  }
}
