import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>({});

  constructor(private tokenService: TokenService) {
    if (this.tokenService.hasToken()) {
      this.decodeJWT();
    }
  }

  private decodeJWT() {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;
    this.userSubject.next(user);
  }

  sendUser() {
    return this.userSubject.asObservable();
  }

  saveToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeJWT();
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next({});
  }

  isLoggedIn() {
    return this.tokenService.hasToken();
  }
}
