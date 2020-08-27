import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent, DashboardComponent, NotFoundComponent } from './components/index';
import { CompListComponent } from './components/dashboard/comp-list/comp-list.component';
import { RolesprevilagesComponent } from './components/dashboard/rolesprevilages/rolesprevilages.component';
import { TransListComponent } from './components/dashboard/trans-list/trans-list.component';
import { CompTabsComponent } from './components/dashboard/comp-list/comp-tabs/comp-tabs.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [

      // standard screens
      { path: 'rolePrevilages', component: RolesprevilagesComponent, canActivate: [AuthGuard] },

      // masters screen
      { path: 'master/:id/:id1', component: CompTabsComponent, canActivate: [AuthGuard] },
      { path: 'master/:id', component: CompListComponent, canActivate: [AuthGuard] },

      // transation screens
      { path: 'transaction/:id/:id1', component: TransListComponent, canActivate: [AuthGuard] },
      { path: 'transaction/:id', component: TransListComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
