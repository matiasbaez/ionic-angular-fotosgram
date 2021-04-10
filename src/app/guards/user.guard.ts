import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

import { UserService } from '../services/user.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {

  constructor(
    private userService: UserService
  ) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.validateToken();
  }

  // canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   return false;
  // }

}
