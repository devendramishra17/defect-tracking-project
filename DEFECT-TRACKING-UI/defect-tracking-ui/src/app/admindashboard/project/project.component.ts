import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CellValueChangedEvent, RowValueChangedEvent } from 'ag-grid-community';
import { project } from 'src/app/project';
import { AdminService } from 'src/app/services/admin.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { user } from 'src/app/User';
import Swal from 'sweetalert2';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  closeResult:string | undefined
  newproject:project=new project();
  ColumnDefs: any;  
    RowData: any=[];  
    IsColumnsToFit: boolean=false; 
    AgLoad:boolean=false;  
    gridApi: any;  
    gridColumnApi: any; 
    loogedinuser: any;
    frameworkcomponent: any;
    projectexist:boolean=false;
    public editType = 'fullRow';
  constructor(private modalService: NgbModal,private adminservice:AdminService,private _snackBar: MatSnackBar,private projectService:ProjectsService,private router:Router)
   {
     this.RowData=this.adminservice.getProject();
   }

  ngOnInit(): void {
    this.GetAgColumns(); 
    this.getCurrentUserId(); 
    this.RowData=this.adminservice.getProject();
  }



  onGridReady(params:any)
   {
     this.gridApi=params.api;
     this.gridColumnApi=params.columnApi;
     this.gridApi.sizeColumnsToFit();
   }

   GetAgColumns() {  
    this.ColumnDefs = [  
      { headerName: 'Project Name', field: 'projectName', sortable: true, filter: true,  },  
      { headerName: 'Description',  field: 'description', sortable: true, filter: true , editable: true},  
      { headerName: 'Creator Name', field: 'creator', cellRenderer : this.creatorFunc, sortable: true, filter: true },
      { headerName: 'Created Time', field: 'createdTime',  sortable: true, filter: true },
      { headerName: 'Modified Time',field: 'modifiedTime', sortable: true, filter: true },
      { headerName: 'Action',   cellRenderer: "mycustomizecell",
      cellRendererParams: {
        cancelOtherRowEditors: this.cancelOtherRowEditors.bind(this)
      },
      width: 180 }

    ];
    this.frameworkcomponent = {
      mycustomizecell: UserEditComponent
    } 
  }  
  cancelOtherRowEditors(currentRowIndex:any) {
    const renderers = this.gridApi.getCellRendererInstances();
   
  }

  creatorFunc(params:any)
  {
    var paramValue=params.data.creator;
    var creatorFullName='';
   if(paramValue!=null)
      return creatorFullName=paramValue.firstname + ' '+ paramValue.lastname;
    return creatorFullName;
  }
  action(params:any)
  {
    return ` <mat-icon>more_vert</mat-icon>`

  }

  register(f:NgForm)
  {
    console.log(this.newproject);  
        this.newproject.creator=this.loogedinuser;
        
     this.adminservice.addProject(this.newproject).subscribe(data=>{
      this.openSnackbar('Project added successfully',"Dismiss")
      this.ngOnInit();
    },error=>{
      this.openSnackbar('something went wrong',"Dismiss")
     })
   this.modalService.dismissAll();  
     f.form.reset();  
  }


  openSnackbar(message:any,action:any)
  {
  this._snackBar.open(message,action,{duration:2000});
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getCurrentUserId()
   {
     this.adminservice.getUserIdByUsername().subscribe(data=>
      {
        this.loogedinuser =data;
      },
      error=>{
        alert("something went wrong");
        });
   }
     projectnamePresent:boolean=false;

   projectNameChange(e:any)
   {
      this.projectService.projectNameExist(e).subscribe(data=>{
                if(data!=null)
               this.projectnamePresent=true;
               else this.projectnamePresent=false;
      },error=>{
          
      })
     
   }


   onRowClicked(e:any)
   {   //localStorage.getItem('QADEV')=='QA Developer'
     localStorage.setItem("projectId",e.data.projectid);
    
       this.projectService.getTicketByProjectId(e).subscribe((response:any)=>{
         console.log("tickets by projectname",response);
     })
        this.router.navigate(['/ticket'])  
   }


   
  onRowValueChanged(event: RowValueChangedEvent) {
    var data = event.data;
    console.log(data);
    if (data.description>150) {
      data.description=data.description.substring(0,150);
    }
      console.log("else");
        this.projectService.updateProject(data).subscribe(response=>{
         this.RowData=this.adminservice.getProject();
       })
       this.openSnackbar('Project Updated successfully',"Dismiss")
  }

  simpleAlert(){  
    Swal.fire('Project name already exist');  
  }  
    
  
  onCellValueChanged(event: CellValueChangedEvent) {
    console.log('onCellValueChanged: ' ,event.data);
   
  }

     flag:String="";
  onBtStartEditing(flag:any) {
    console.log(flag);
    if(flag=="true"){
    this.gridApi.setFocusedCell(this,'action');
    this.gridApi.startEditingCell({
      rowIndex: this,
      colKey: 'action',
    });
   } 

  }

   
}
