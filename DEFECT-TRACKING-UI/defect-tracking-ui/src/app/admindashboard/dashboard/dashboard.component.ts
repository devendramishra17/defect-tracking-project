import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from 'src/app/services/projects.service';
import {MatDialog} from '@angular/material/dialog';

import { AdminService } from 'src/app/services/admin.service';
import { user } from 'src/app/User';
import { Observable } from 'rxjs';
import { UserlistComponent } from '../userlist/userlist.component';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private modalService: NgbModal,private adminservice:AdminService,private _snackBar: MatSnackBar,private projectService:ProjectsService) { 
  }
  ColumnDefs: any;  
  RowData: any=[];  
  gridApi: any;  
   gridColumnApi: any; 

   ngOnInit(): void {
   
     
   }
   
   onGridReady(params:any)
   {
     this.gridApi=params.api;
     this.gridColumnApi=params.columnApi;
     this.gridApi.sizeColumnsToFit();
   }


 
    }

