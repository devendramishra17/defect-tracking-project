import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { project } from 'src/app/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { TicketComponent } from '../ticket/ticket.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  closeResult:string | undefined
  newproject:project=new project();
  ColumnDefs: any;  
    RowData: any=[];  
    IsColumnsToFit: boolean=false; 
    AgLoad:boolean=false;  
    gridApi: any;  
    gridColumnApi: any; 
    
  constructor(private projectservice:ProjectsService,private route:Router) { }

  ngOnInit(): void {
    this.GetAgColumns(); 
    this.RowData=this.projectservice.getProject();
    localStorage.removeItem("projectId");
  }


  onGridReady(params:any)
   {
     
     
     this.gridApi=params.api;
     this.gridColumnApi=params.columnApi;
     this.gridApi.sizeColumnsToFit();
   }

   GetAgColumns() {  
    this.ColumnDefs = [  
      { headerName: 'Project Name', field: 'projectName', sortable: true, filter: true },  
      { headerName: 'Description',  field: 'description', sortable: true, filter: true },  
      { headerName: 'Creator Name', field: 'creator', cellRenderer : this.creatorFunc, sortable: true, filter: true },
      { headerName: 'Created Time', field: 'createdTime',  sortable: true, filter: true },
      { headerName: 'Modified Time',field: 'modifiedTime', sortable: true, filter: true }
    ];  
  }  

  creatorFunc(params:any)
  {
    var paramValue=params.data.creator;
    var creatorFullName='';
   if(paramValue!=null)
      return creatorFullName=paramValue.firstname + ' '+ paramValue.lastname;
    return creatorFullName;
  }

  


  onRowClicked(e:any)
  {   //localStorage.getItem('QADEV')=='QA Developer'
    localStorage.setItem("projectId",e.data.projectid);
    if(localStorage.getItem("developer")=="Developer")
    {
      this.projectservice.getTicketByProjectId(e).subscribe((response:any)=>{
    })
       this.route.navigate(['/developer'])
    }
    else if(localStorage.getItem("qa")=="QA"){
      this.projectservice.getTicketByProjectId(e).subscribe((response:any)=>{

    })
       this.route.navigate(['/ticket'])  
    }
    
  }



}
