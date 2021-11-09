import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './../../services/app.service';
import { Orders } from 'src/app/models/orders';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {

  @Input() order:Orders;
  form: FormGroup;
  isEditMode = false;

  private id: any;
  //private order = {} as Orders;
  private users: any;
  private categories: any;

  constructor(
    private actRoute: ActivatedRoute,
    public apiService: ApiService,
    private navCtrl: NavController,
    private appService: AppService,
    public formBuilder: FormBuilder,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {
    this.initAddOrderForm();
    //this.getCategories();
    //this.getUsers();
    if (this.order) {
      this.isEditMode=true;
      this.setFormValues();
    }
  }

  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }
  
  initAddOrderForm(){
    this.form = new FormGroup({
      title: new FormControl(null,[Validators.required]),
      description: new FormControl(null,[Validators.required]),
    });
  }

  setFormValues(){
    this.form.setValue({
      title: this.order.title,
      description: this.order.description,
    });

    this.form.updateValueAndValidity();
  }

  submitOrder(){
    this.appService.presentLoading(1);
    //custom input
    this.form.value['date']= moment().locale('es').format('lll');

    let response: Observable<Orders>;

    if (this.isEditMode) {
      response = this.apiService.updateOrder(this.order.id,this.form.value);
    }else{
      response = this.apiService.addOrder(this.form.value);
    }

    response.pipe(take(1)).subscribe((order) =>{
      this.appService.presentLoading(0);
      this.appService.presentToast('Order request created successfully');
      console.log(order);
      this.form.reset();
      this.navCtrl.navigateRoot('/tabs/orders');

      //show data updated after return
      if (this.isEditMode) {
        this.closeModal(order);
      }
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
          this.apiService.addOrder(data).subscribe((response) => {
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


  // getCategories(){
  //   this.apiService.getCategories().subscribe(response => {
  //     this.categories = response;
  //     console.log(this.categories);
  //   });
  // }

  // getUsers(){
  //   this.apiService.getUsers().subscribe(response => {
  //     this.users = response;
  //     console.log(this.users);
  //   });
  // }
}
