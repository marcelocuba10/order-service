import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  user: User;
  userRole;

  constructor(
    private authService:AuthService
  ) {}

  ngOnInit() {
    console.log('run in the first moment');

    //get User
    this.authService.user().subscribe(
      user => {
        this.user = user;
        this.userRole = user.role;
        console.log(user);
      }
    );
  }

}
