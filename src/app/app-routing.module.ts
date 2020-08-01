import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent, DashboardComponent, NotFoundComponent } from './components/index';
import { CompListComponent } from './components/dashboard/comp-list/comp-list.component';
import { RolesprevilagesComponent } from './components/dashboard/comp-list/rolesprevilages/rolesprevilages.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'rolePrevilages', component: RolesprevilagesComponent, canActivate: [AuthGuard] },
      { path: ':id', component: CompListComponent, canActivate: [AuthGuard] }
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
