import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
      return this.http.get<any>(`${environment.apiUrl}/user/` + id, 
        {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
          })
        })
        /*headers: new Headers().set('Authorization', JSON.parse(localStorage.getItem('twtToken')))*/
 
    }

   /* register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }*/
}
