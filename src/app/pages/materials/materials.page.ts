import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.page.html',
  styleUrls: ['./materials.page.scss'],
})
export class MaterialsPage implements OnInit {

  private materials: any;
  private categories: any;

  constructor(
    public apiService: ApiService,
    ) { }

  ngOnInit() {
    this.apiService.getMaterials().subscribe(response => {
        this.materials = response;
        console.log(this.materials);
      });
      this.getCategories();
  }

  getCategories(){
    this.apiService.getCategories().subscribe(response => {
      this.categories = response;
      console.log(this.categories);
    });
  }

}
