import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentuser'));
    }

    ngOnInit() {
    //    this.loadAllUsers();
    }

    getUser(id: number) {
      this.userService.getById(id).pipe(first()).subscribe(user => { this.currentUser = user; }); 
    }

    /*deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }*/

    /*private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }*/
}
