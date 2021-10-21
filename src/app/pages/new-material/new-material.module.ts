import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewMaterialPageRoutingModule } from './new-material-routing.module';

import { NewMaterialPage } from './new-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewMaterialPageRoutingModule
  ],
  declarations: [NewMaterialPage]
})
export class NewMaterialPageModule {}
