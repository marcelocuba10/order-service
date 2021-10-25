import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'materials',
    loadChildren: () => import('./pages/materials/materials.module').then( m => m.MaterialsPageModule)
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./pages/order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'new-order',
    loadChildren: () => import('./pages/new-order/new-order.module').then( m => m.NewOrderPageModule)
  },
  {
    path: 'new-material',
    loadChildren: () => import('./pages/new-material/new-material.module').then( m => m.NewMaterialPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
