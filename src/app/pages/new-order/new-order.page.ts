import { NavController } from '@ionic/angular';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppService } from './../../services/app.service';
import { Orders } from 'src/app/models/orders';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {

  private id: any;
  private order = {} as Orders;

  constructor(
    private actRoute: ActivatedRoute,
    public apiService: ApiService,
    private navCtrl: NavController,
    private appService: AppService
  ) { }

  ngOnInit() {
  }

  async savedata(data) {

    if (await this.appService.formValidation(data, 'order')) {

      await this.appService.presentLoading(1);

      if (this.id) {
        try {
          this.apiService.updateOrder(this.id, this.order).subscribe(response => {
            this.appService.presentLoading(0); //dissmiss
            this.appService.presentToast('Service order updated successfully');
            this.navCtrl.navigateRoot('/orders');
          });
        } catch (error) {
          this.appService.presentToast(error);
          this.appService.presentLoading(0);
          console.log(error);
        }
      } else {
        try {
          this.apiService.createOrder(data).subscribe((response) => {
            this.appService.presentLoading(0);
            this.appService.presentToast('Veiculo criado com exito!');
            this.navCtrl.navigateRoot('/cars');
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
