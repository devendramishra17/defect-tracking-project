import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { DeveloperComponent } from './developer/developer.component';
import { ProjectsComponent } from './projects/projects.component';
import { QadevComponent } from './qadev/qadev.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  {
    path:"userprojects",
    component:ProjectsComponent,
    canActivate:[AuthGuard],
  },
  {
    path:"ticket",  
    component:TicketComponent,
    canActivate:[AuthGuard],
  },
  {
    path:"developer",
    component:DeveloperComponent,
    canActivate:[AuthGuard],
  },
  {
    path:"qadev",
    component:QadevComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'userprojects',
        component:ProjectsComponent,
        canActivate:[AuthGuard]
      },
    ]  
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserdashboardRoutingModule { }
