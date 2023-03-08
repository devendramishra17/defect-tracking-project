import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdashboardRoutingModule } from './userdashboard-routing.module';
import { TicketComponent } from './ticket/ticket.component';
import { MatButtonModule } from '@angular/material/button';
import { AgGridModule } from 'ag-grid-angular';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select';
import { ProjectsComponent } from './projects/projects.component';
import { DeveloperComponent } from './developer/developer.component';
import { QadevComponent } from './qadev/qadev.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    TicketComponent,
    ProjectsComponent,
    DeveloperComponent,
    QadevComponent
  ],
  imports: [
    CommonModule,
    UserdashboardRoutingModule,
    MatButtonModule,
    AgGridModule,
    AgGridModule.withComponents([TicketComponent]),
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule, 
    NgSelectModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
  ]
})
export class UserdashboardModule { }
