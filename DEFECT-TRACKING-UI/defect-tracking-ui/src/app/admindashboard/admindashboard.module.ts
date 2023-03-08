import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserlistComponent } from './userlist/userlist.component';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import { ProjectComponent } from './project/project.component';
import { LoginComponent } from '../component/login/login.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FormControl, Validators} from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from "@ng-select/ng-select";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MatOption } from '@angular/material/core';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserEditComponent } from './user-edit/user-edit.component';
@NgModule({
  declarations: [DashboardComponent, UserlistComponent, ProjectComponent, UserEditComponent],
  imports: [
    CommonModule,
    AdmindashboardRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    AgGridModule.withComponents([UserlistComponent,ProjectComponent,UserEditComponent]), 
    NgSelectModule,
    MatCheckboxModule,
    
    ReactiveFormsModule,MatMenuModule
  ]
  
})
export class AdmindashboardModule { }
