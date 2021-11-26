import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User;

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private appService: AppService
  ) { }

  ngOnInit() {
  }

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  // On Register button tap, dismiss login modal and open register modal
  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }
  async login(form: NgForm) {

    this.appService.presentLoading(1);
    await this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.appService.presentToast('Logged In');
      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissLogin();
        this.appService.presentLoading(0);
        this.navCtrl.navigateRoot('tabs/orders');
      }
    );
  }

}
