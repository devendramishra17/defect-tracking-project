import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { project } from 'src/app/project';
import { AdminService } from 'src/app/services/admin.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { UserService } from 'src/app/services/user.service';
import { ticket } from 'src/app/Ticket';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserEditComponent } from 'src/app/admindashboard/user-edit/user-edit.component';
import { CellValueChangedEvent, RowValueChangedEvent } from 'ag-grid-community';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticket: ticket = new ticket();
  ColumnDefs: any;
  RowData: any = [];

  IsColumnsToFit: boolean = false;
  AgLoad: boolean = false;
  gridApi: any;
  gridColumnApi: any;
  selectedProject: string | undefined;
  selectedStatus: string | undefined;
  selectedUser: string | undefined;
  closeResult: string | undefined
  loogedinuser: any;
  frameworkcomponent: any;
  user: any = [];
  status: any = [];
  CurrentProjects: any = [];
  ticketname: boolean = false;
  statusOfNewTicket = { "statusid_pk": 2, "status": "reopen" };
  statusOfNewTicket1 = { "statusid_pk": 3, "status": "close" };
  constructor(private adminService: AdminService, private modalService: NgbModal, private _snackBar: MatSnackBar, private userService: UserService, private projectService: ProjectsService) {
    var id = localStorage.getItem("projectId");

    adminService.getDeveloper().subscribe(
      (response: any) => {
        for (let i = 0; i < response.length; i++) {
          this.user.push(response[i]);
        }
      });

    adminService.getStatus().subscribe(
      (response: any) => {
        for (let i = 0; i < response.length; i++) {
          this.status.push(response[i]);
        }
      });

    this.userService.getProjectByProjectId(id).subscribe((response: any) => {
      this.CurrentProjects = response;
    });

  }

  ngOnInit(): void {
    this.GetAgColumns();
    this.getCurrentUserId();
    this.getTickteByUsername();
    var id = localStorage.getItem("projectId");
    this.RowData = this.userService.getTicketByProjectId(id);
    this.ticketname = false;
  }

  openSnackbar(message: any, action: any) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  GetAgColumns() {
    this.ColumnDefs = [
      {
        headerName: 'Status', field: 'statusid_fk', cellRenderer: this.statusFunc, sortable: true, filter: true, editable: true, cellEditor: 'agSelectCellEditor', cellEditorParams: {
          values: ['Reopen', 'Close'],
        }
      },
      { headerName: 'Ticket Name', field: 'ticketname', sortable: true, filter: true },
      { headerName: 'Description', field: 'description', sortable: true, filter: true },
      { headerName: 'Assign To', field: 'assigntoid', cellRenderer: this.creatorFunc, sortable: true, filter: true },
      { headerName: 'Created Time', field: 'createdtime', sortable: true, filter: true },
      { headerName: 'Modified Time', field: 'modifiedtime', sortable: true, filter: true },
      { headerName: 'Remark', field: 'remark', length: 100, sortable: true, filter: true, editable: true },
      {
        headerName: 'Action', cellRenderer: "mycustomizecell", field: "action",
        cellRendererParams: { cancelOtherRowEditors: this.cancelOtherRowEditors.bind(this) },
        width: 180
      }
    ];
    this.frameworkcomponent = {
      mycustomizecell: UserEditComponent
    }
  }

  onBtStartEditing(flag: any) {
    console.log(flag);
    if (flag == "true") {
      this.gridApi.setFocusedCell(this, 'action');
      this.gridApi.startEditingCell({
        rowIndex: this,
        colKey: 'action',
      });
    }

  }
  public editType = 'fullRow';

  cancelOtherRowEditors(currentRowIndex: any) {
    const renderers = this.gridApi.getCellRendererInstances();

  }

  onCellClicked(params: any) {
    if (params.node.field !== 'action') {
      this.cancelOtherRowEditors(params.node.rowIndex);
    }
  }


  onRowValueChanged(event: RowValueChangedEvent) {
    var data = event.data;
    console.log("FROM TICKET EDIT", data);
    if (data.remark.length > 50) {
      data.remark = data.remark.substring(0, 50);
    }
    if (data.statusid_fk == 'Reopen')
      data.statusid_fk = this.statusOfNewTicket;
    else data.statusid_fk = this.statusOfNewTicket1;
    this.userService.updateTicket(data, data.ticketid_pk).subscribe((data) => {
      this.RowData = this.userService.getTicketByProjectId(localStorage.getItem("projectId"));
    }
    )
    this.openSnackbar('Ticket Updated successfully', "dismiss")

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

  createTicket(f: NgForm) {
    this.ticket.ticketcreatorid = this.loogedinuser;
    this.ticket.project = this.CurrentProjects;
    this.ticket.statusid_fk = { "statusid_pk": 1, "status": "open" }
    this.userService.insertTicket(this.ticket).subscribe(data => {
      this.openSnackbar('added successfully', "dismiss")
      this.ngOnInit();
    }, error => {
      this.openSnackbar('something went wrong', "dismiss")
    });

    this.modalService.dismissAll();
    f.form.reset();
  }


  TicketNameUnique(e: any) {
    var id = localStorage.getItem("projectId");
    this.userService.getTicketNameByProjectId(id, e).subscribe(response => {
      console.log(response);

      if (!response)
        this.ticketname = true
      else {
        this.ticketname = false;
      }
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  getCurrentUserId() {
    this.adminService.getUserIdByUsername().subscribe(data => {
      this.loogedinuser = data;
    },
      error => {
        alert("something went wrong");
      });
  }

  getTickteByUsername() {
    this.userService.getTicketByUsername().subscribe(
      (response: any) => {
      }
    );
  }

}