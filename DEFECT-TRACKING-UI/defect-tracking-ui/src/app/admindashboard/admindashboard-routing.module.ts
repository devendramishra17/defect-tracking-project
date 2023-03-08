import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { LoginComponent } from '../component/login/login.component';
import { AuthGuard } from '../services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from '../userdashboard/projects/projects.component';
import { ProjectComponent } from './project/project.component';
const routes: Routes = [
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
     
      {
        path:'userlist',
        component:UserlistComponent,
        canActivate:[AuthGuard]
      },
     
      {
        path:"project",
        component:ProjectComponent,
        canActivate:[AuthGuard],
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule,FormsModule],
  exports: [RouterModule]
})
export class AdmindashboardRoutingModule { }
