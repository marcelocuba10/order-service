import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { User } from './models/user';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user: User;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private appService: AppService,
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    console.log('run in the first moment');

    //get User
    this.authService.user().subscribe(
      user => {
        this.user = user;
        console.log(user);
      }
    );
  }

  ionViewWillEnter() {
    console.log('run second')
    this.authService.user().subscribe(
      user => {
        this.user = user;
        console.log(user)
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      //this.splashScreen.hide();
      this.authService.getToken();
    });
  }

  // When Logout Button is pressed
  async logout() {
    
    this.appService.presentLoading(1);
    await this.authService.logout().subscribe(
      data => {
        this.appService.presentToast('logout');
      },
      error => {
        console.log(error);
      },
      () => {
        this.appService.presentLoading(0);
        this.navCtrl.navigateRoot('/landing');
      }
    );
  }

}
