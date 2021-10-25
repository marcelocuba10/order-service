import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Materials } from 'src/app/models/materials';
import { ApiService } from 'src/app/services/api.service';
import { AppService } from 'src/app/services/app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.page.html',
  styleUrls: ['./new-material.page.scss'],
})
export class NewMaterialPage implements OnInit {

  private id: any;
  private users: any;
  private categories: any;
  private material = {} as Materials;

  constructor(
    private actRoute: ActivatedRoute,
    public apiService: ApiService,
    private navCtrl: NavController,
    private appService: AppService
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    console.log('run in the first moment');
    this.getCategories();
    this.getUsers();
  }

  ionViewWillEnter() {
    console.log('run in the second moment');
    if (this.id) {
      this.getMaterialById();
    }
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

  public getMaterialById() {
    this.apiService.getMaterialById(this.id).
      subscribe(response => {
        this.material = response;
      });
      console.log(this.material);
  }

  async saveData(data) {

    if (await this.appService.formValidation(data, 'material')) {

      await this.appService.presentLoading(1);

      if (this.id) {
        //is update
        try {
          this.apiService.updateMaterial(this.id, this.material).subscribe(response => {
            this.appService.presentLoading(0);
            this.appService.presentToast('Material updated successfully');
            this.navCtrl.navigateRoot('/tabs/materials');
          });
        } catch (error) {
          this.appService.presentToast(error);
          this.appService.presentLoading(0);
          console.log(error);
        }
      } else {
        //is create
        try {
          this.material.date = moment().locale('es').format('LLL');
          this.material.status='Pending';
          this.apiService.createMaterial(data).subscribe((response) => {
            this.appService.presentLoading(0);
            this.appService.presentToast('Material request created successfully');
            this.navCtrl.navigateRoot('/tabs/materials');
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
