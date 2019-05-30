import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import {pipe} from "rxjs";
import lint from "@angular/cli/commands/lint";

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.get<any>(`${environment.apiUrl}/identity-provider/auth?username=${username}&password=${password}`)
      .pipe(map(jwtResponse => {
        // login successful if there's a jwt token in the response
        if (jwtResponse) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('jwtToken', jwtResponse.jwtToken);
          localStorage.setItem('currentuser', JSON.stringify(jwtResponse.user));
        }
        return jwtResponse;
      }));
  }

  logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
  }


  init2fa() {
      return this.http.get(`${environment.apiUrl}/login-manager/init2fa`);
  }
}
