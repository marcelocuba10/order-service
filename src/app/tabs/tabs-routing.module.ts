import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../pages/orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'materials',
        loadChildren: () => import('../pages/materials/materials.module').then(m => m.MaterialsPageModule)
      },
      {
        path: 'order-detail/:id',
        loadChildren: () => import('../pages/order-detail/order-detail.module').then(m => m.OrderDetailPageModule)
      },
      {
        path: 'new-order',
        loadChildren: () => import('../pages/new-order/new-order.module').then(m => m.NewOrderPageModule)
      },
      {
        path: 'new-material/:id',
        loadChildren: () => import('../pages/new-material/new-material.module').then(m => m.NewMaterialPageModule)
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
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'order-detail/:id',
    redirectTo: '/tabs/order-detail/:id',
    pathMatch: 'full'
  },
  {
    path: 'new-material/:id',
    redirectTo: '/tabs/new-material/:id',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
