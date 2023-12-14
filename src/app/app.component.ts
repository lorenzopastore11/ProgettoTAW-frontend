import { Component, OnInit } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { TableService } from './_services/table.service';
import { Table } from './_models/table';
import { Router } from '@angular/router';
import { SocketService } from './_services/socket.service';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit{

    public n: string [] = [];
    [x: string]: any;
    user?: User | null;
    public role
    table?: Table | null;
    users?: any[]

    constructor(private accountService: AccountService, private router: Router, private socketService: SocketService) {
      this.accountService.user.subscribe(x => this.user = x)
      this.role = this.accountService.userValue?.role

      this.accountService.check()
        .subscribe(x => {
          this.users = x
          if(!this.users) {
            this.router?.navigate(['/register'])
          }
        });
    }

    ngOnInit(): void {
      this.socketService.pippo('connection');
    }

    logout() {
      this.accountService.logout();
    }
}
