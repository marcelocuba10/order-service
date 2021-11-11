import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Orders } from 'src/app/models/orders';
import { DatePipe } from '@angular/common'
import { NewOrderPage } from 'src/app/pages/new-order/new-order.page';
import { ApiService } from 'src/app/services/api.service';
import { take } from 'rxjs/operators';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss'],
})
export class DetailOrderComponent implements OnInit {

  //receive data from orders page
  @Input() order: Orders;
  category:Categories;
  dateOrder:string;

  constructor(
    private modalCtrl: ModalController,
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    public datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.dateOrder =this.datepipe.transform(this.order.date, 'M/d/yy, h:mm a');
    this.getCategoryById();
  }

  closeModal(role = "edit") {
    //envio los datos actualizados al listado de orders
    this.modalCtrl.dismiss(this.order, role);
  }

  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: NewOrderPage,
      componentProps: { order: this.order }
    });

    await modal.present();

    //captura los datos actualizados
    const { data: updatedOrder } = await modal.onDidDismiss();
    if (updatedOrder) {
      this.order = updatedOrder;
    }
  }

  getCategoryById(){
    this.apiService.getCategoryById(this.order.categoryId).subscribe((data: Categories)=>{
      this.category = data;
      console.log(this.category)
    });
  }

  async onDeleteOrder() {
    const loading = await this.loadingCtrl.create({ message: "Deleting.." });
    loading.present();

    this.apiService.deleteOrder(this.order.id).pipe(take(1)).subscribe(() => {
      console.log("cancelas")
      loading.dismiss();
      this.closeModal('delete');
    });
  }

}
