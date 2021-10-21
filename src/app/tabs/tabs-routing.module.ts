import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'orders',
        loadChildren: () => import('../pages/orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'materials',
        loadChildren: () => import('../pages/materials/materials.module').then(m => m.MaterialsPageModule)
      },
      {
        path: 'order-detail',
        loadChildren: () => import('../pages/order-detail/order-detail.module').then(m => m.OrderDetailPageModule)
      },
      {
        path: 'new-order',
        loadChildren: () => import('../pages/new-order/new-order.module').then(m => m.NewOrderPageModule)
      },
      {
        path: 'new-material',
        loadChildren: () => import('../pages/new-material/new-material.module').then(m => m.NewMaterialPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/orders',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/orders',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
