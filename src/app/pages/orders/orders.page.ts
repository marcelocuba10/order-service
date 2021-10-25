import { AppService } from './../../services/app.service';
import { Component } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Orders } from 'src/app/models/orders';
import { Users } from 'src/app/models/users';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  styleUrls: ['orders.page.scss']
})
export class OrdersPage {

  private orders: any;
  private users: any;
  private categories: any;

  constructor(
    public apiService: ApiService,
    private appService: AppService
  ) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.apiService.getOrders().subscribe(response => {
        this.orders = response;
        console.log(this.orders);
      });
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

}
