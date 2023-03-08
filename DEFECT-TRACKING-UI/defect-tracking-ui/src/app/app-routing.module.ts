import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardRoutingModule } from './admindashboard/admindashboard-routing.module';
import { AdmindashboardModule } from './admindashboard/admindashboard.module';

import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { UserdashboardModule } from './userdashboard/userdashboard.module';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent,
    //pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent,
   // pathMatch:"full"
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,AdmindashboardModule,UserdashboardModule]
})
export class AppRoutingModule { }
