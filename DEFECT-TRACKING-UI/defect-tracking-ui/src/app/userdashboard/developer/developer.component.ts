import { APP_ID, Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ticket } from 'src/app/Ticket';
import { CellValueChangedEvent, RowValueChangedEvent } from 'ag-grid-community';
import { UserEditComponent } from 'src/app/admindashboard/user-edit/user-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {

  ticket: ticket = new ticket();
  ColumnDefs: any;
  RowData: any = [];
  RowDataAllTicket: any = [];
  IsColumnsToFit: boolean = false;
  AgLoad: boolean = false;
  gridApi: any;
  gridColumnApi: any;
  selectedProject: string | undefined;
  selectedStatus: string | undefined;
  selectedUser: string | undefined;
  closeResult: string | undefined
  loogedinuser: any;
  selecteType: String = "My Ticket";
  projectSelection = ["My Ticket", "All"];
  project: any = [];
  user: any = [];
  status: any = [];
  frameworkcomponent: any;
  constructor(private adminService: AdminService, private _snackBar: MatSnackBar,private modalService: NgbModal, private userService: UserService) {
    this.RowData = this.userService.getTicketByProjectIdAndUsername(localStorage.getItem("projectId"));
  }

  ngOnInit(): void {
    this.GetAgColumns();
    this.getCurrentUserId();
  }

  selectTypeOfView(e: any) {
    if (e == "All") {
      this.RowData = this.userService.getTicketByProjectId(localStorage.getItem("projectId"));
     this.gridColumnApi.setColumnVisible('action', false)
     this.gridApi.sizeColumnsToFit();
    } else {
     this.gridColumnApi.setColumnVisible('action', true) 
     this.gridApi.sizeColumnsToFit();
      this.RowData = this.userService.getTicketByProjectIdAndUsername(localStorage.getItem("projectId"));
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  statusOfNewTicket={"statusid_pk":4,"status":"fixed"};

  GetAgColumns() {
    this.ColumnDefs = [
      { headerName: 'Status', field: 'statusid_fk', cellRenderer: this.statusFunc, sortable: true, filter: true , cellEditor: 'agSelectCellEditor', editable: true, cellEditorParams: {
        values: ['Fixed'],}},
      { headerName: 'Ticket Name', field: 'ticketname', sortable: true, filter: true },
      { headerName: 'Description', field: 'description', sortable: true, filter: true },
      { headerName: 'Assign To', field: 'assigntoid', cellRenderer: this.creatorFunc, sortable: true, filter: true },
      { headerName: 'Created Time', field: 'createdtime', sortable: true, filter: true },
      { headerName: 'Remark', field: 'remark', sortable: true, filter: true, editable: true },
      { headerName: 'Modified Time', field: 'modifiedtime', sortable: true, filter: true },
      { headerName: 'Action', 
        cellRenderer: "mycustomizecell", field:"action",
        cellRendererParams: {cancelOtherRowEditors: this.cancelOtherRowEditors.bind(this)},
        width: 180
       }

    ];
    this.frameworkcomponent = {
      mycustomizecell: UserEditComponent
    }
  }
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
  public editType = 'fullRow';

  cancelOtherRowEditors(currentRowIndex:any) {
    const renderers = this.gridApi.getCellRendererInstances();
   
  }

  onCellClicked(params:any) {
    if(params.node.field !== 'action') {
      this.cancelOtherRowEditors(params.node.rowIndex);
    }
  }

  onRowValueChanged(event: RowValueChangedEvent) {
    var data = event.data;
     data.statusid_fk=this.statusOfNewTicket;
     this.userService.updateTicket(data,data.ticketid_pk).subscribe((data)=>{
    
        this.RowData = this.userService.getTicketByProjectIdAndUsername(localStorage.getItem("projectId"));
      
     })
    
    
  this.openSnackbar("Ticket Updated Successfully","Dismiss")
    }

    
  openSnackbar(message:any,action:any)
  {
  this._snackBar.open(message,action,{duration:2000});
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log( 'onCellValueChanged: ' ,event.data);
  }

  creatorFunc(params: any) {
    var paramValue = params.data.assigntoid;
    var creatorFullName = '';
    if (paramValue != null)
      return creatorFullName = paramValue.firstname + ' ' + paramValue.lastname;
    return creatorFullName;
  }

  statusFunc(params: any) {
    var paramValue = params.data.statusid_fk;
    var statusName = '';
    if (paramValue != null)
      return statusName = paramValue.statusname;
    return statusName;
  }

  projectFunc(params: any) {
    var paramValue = params.data.project;
    var statusName = '';
    if (paramValue != null)
      return statusName = paramValue.projectName;
    return statusName;
  }


  getCurrentUserId() {
    this.adminService.getUserIdByUsername().subscribe(data => {
      this.loogedinuser = data;
    },
      error => {
        alert("something went wrong");
      });
  }

}
