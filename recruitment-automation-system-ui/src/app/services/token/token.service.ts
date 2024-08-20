import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string)
  {
    localStorage.setItem('token', token);
  }
  get token(): string
  {
    return localStorage.getItem('token') as string;
  }

  // isTokenNotValid() {
  //   return !this.isTokenValid();
  // }
  //
  // private isTokenValid() {
  //   const token: string = this.token;
  //   if (!token) {
  //     return false;
  //   }
  //   //decode the token
  //   const jwtHelper: JwtHelperService = new JwtHelperService();
  //   const isTokenExpired=jwtHelper.isTokenExpired(token);
  //   if (isTokenExpired) {
  //     localStorage.clear();
  //     return false;
  //   }
  //
  //   return true;
  // }
}
