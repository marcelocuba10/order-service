import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private appService: AppService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  // Dismiss Register Modal
  dismissRegister() {
    this.modalController.dismiss();
  }

  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

  register(form: NgForm) {
    this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password).subscribe(
      data => {
        this.authService.login(form.value.email, form.value.password).subscribe(
          () => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.dismissRegister();
            this.navCtrl.navigateRoot('tabs/orders');
          }
        );
        this.appService.presentToast('registro con sucesso');
      },
      error => {
        console.log(error);
      },
      () => {

      }
    );
  }

}
