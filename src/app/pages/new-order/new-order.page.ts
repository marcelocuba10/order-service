import { NavController } from '@ionic/angular';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../services/app.service';
import { Orders } from 'src/app/models/orders';
import * as moment from 'moment';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {

  private id: any;
  private order = {} as Orders;
  private users: any;
  private categories: any;

  constructor(
    private actRoute: ActivatedRoute,
    public apiService: ApiService,
    private navCtrl: NavController,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getUsers();
  }

  getCategories(){
    this.apiService.getCategories().subscribe(response => {
      this.categories = response;
      console.log(this.categories);
    });
  }

  getUsers(){
    this.apiService.getUsers().subscribe(response => {
      this.users = response;
      console.log(this.users);
    });
  }

  async saveData(data) {

    if (await this.appService.formValidation(data, 'order')) {

      await this.appService.presentLoading(1);

      if (this.id) {
        //is update
        try {
          this.apiService.updateOrder(this.id, this.order).subscribe(response => {
            this.appService.presentLoading(0);
            this.appService.presentToast('Order updated successfully');
            this.navCtrl.navigateRoot('/tabs/orders');
          });
        } catch (error) {
          this.appService.presentToast(error);
          this.appService.presentLoading(0);
          console.log(error);
        }
      } else {
        //is create
        try {
          this.order.date = Date.now();
          this.apiService.createOrder(data).subscribe((response) => {
            this.appService.presentLoading(0);
            this.appService.presentToast('Order request created successfully');
            this.navCtrl.navigateRoot('/tabs/orders');
          });
        } catch (error) {
          this.appService.presentToast(error);
          this.appService.presentLoading(0);
          console.log(error);
        }
      }
    }
  }

}
