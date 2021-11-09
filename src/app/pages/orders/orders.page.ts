import { AppService } from './../../services/app.service';
import { Component } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Orders } from 'src/app/models/orders';
import { Users } from 'src/app/models/users';
import { Categories } from 'src/app/models/categories';
import { ModalController } from '@ionic/angular';
import { DetailOrderComponent } from 'src/app/components/detail-order/detail-order.component';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  styleUrls: ['orders.page.scss']
})
export class OrdersPage {

  orders$: Observable<Orders[]>;

  //private orders: any;
  //private users: any;
  //private categories: any;

  constructor(
    public apiService: ApiService,
    private appService: AppService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.appService.presentLoading(1);

    this.orders$ = this.apiService.getOrders().pipe(
      tap((orders) => {
        this.appService.presentLoading(0);

        return orders;
      })
    );
    console.log(this.orders$);
    //this.getCategories();
    //this.getUsers();
  }

  async openDetailModal(order: Orders) {
    const modal = await this.modalCtrl.create({
      component: DetailOrderComponent,
      //envio el objeto al modal
      componentProps: { order }
    });

    modal.present();

    //captura los datos actualizados
    const { data: updatedOrder, role } = await modal.onDidDismiss();
    if (updatedOrder && role === "edit") {
      this.orders$ = this.orders$.pipe(
        map((orders) => {
          orders.forEach((element) => {
            if (element.id === updatedOrder.id) {
              element = updatedOrder;
            }
            return element;
          });
          return orders;
        })
      );
    }

    if (role === "delete") {
      this.orders$ = this.orders$.pipe(
        map((orders) => {
          orders.filter((element) => element.id !== updatedOrder.id);
          return orders;
        })
      );
    }
  }

  // getCategories() {
  //   this.apiService.getCategories().subscribe(response => {
  //     this.categories = response;
  //     console.log(this.categories);
  //   });
  // }

  // getUsers() {
  //   this.apiService.getUsers().subscribe(response => {
  //     this.users = response;
  //     console.log(this.users);
  //   });
  // }

}
