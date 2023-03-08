import { Component, OnInit, Input, APP_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { user } from 'src/app/User';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'
import { UserEditComponent } from '../user-edit/user-edit.component';
import * as CryptoJS from 'crypto-js';
import * as JsEncryptModule from 'jsencrypt';

import { CellValueChangedEvent, ColDef, GridApi, GridReadyEvent, ICellEditorComp, ICellEditorParams, RowValueChangedEvent, } from 'ag-grid-community';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  updateUser: user = new user();
  newuser: user = new user();
  publicKey: string = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3wNII83VEnFP34MbWRubsl5T8LfNdGSaSoj+vZ2CPBkT9GPIrg5bign4zrqXVzq1CHmBJY++JXnUuJzBmf+UKm8zGeLNu5G50UwOSB78jkwTb66hC6Bz1sK3+7UE4HCeuvY3eBY01cSaM/l+9DoY3ICcO5+6+7hYMoBiH1RQO9wIDAQAB";
  loogedinuser: any;
  userloggedin: any;
  closeResult: string | undefined
  role: any = []
  userid: number | undefined;
  ColumnDefs: any;
  RowData: any = [];
  IsColumnsToFit: boolean = false;
  AgLoad: boolean = false;
  gridApi: any;
  gridColumnApi: any;
  usernamepresent: Boolean = false;
  userAdded: boolean = false;
  qa = { roleid: 2, rolename: "qa" };
  developer = { roleid: 3, rolename: "developer" };
  frameworkcomponent: any;
  encryptPassword: any;
  decryptPassword: any;

  constructor(private adminservice: AdminService, private modalService: NgbModal, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.GetAgColumns();
    this.getCurrentUserId();

    this.RowData = this.adminservice.getuser();
  }
  public editType = 'fullRow';

  onRowValueChanged(event: RowValueChangedEvent) {
    var data = event.data;
    if (data.firstname.length > 20) {
      this.updateUser.firstname = data.firstname.substring(0, 20);
    } else {
      this.updateUser.firstname = data.firstname;
    }
    if (data.lastname.length > 20) {
      this.updateUser.lastname = data.lastname.substring(0, 20);
    } else {
      this.updateUser.lastname = data.lastname;
    }
    this.updateUser.username = data.username;
    this.updateUser.creatorid = data.creatorid;
    this.updateUser.role.pop();
    this.updateUser.role.pop();
    if (data.role === "QA") {
      this.updateUser.role.push({ "roleId": 2, "roleName": "QA" })
      console.log(this.updateUser.role);
    }
    else if (data.role === "Developer") {
      this.updateUser.role.push({ "roleId": 3, "roleName": "Developer" })
    }
    else if (data.role === "QA/Developer") {
      this.updateUser.role.push({ "roleId": 2, "roleName": "QA" }, { "roleId": 3, "roleName": "Developer" })
    }
    this.adminservice.updateUser(this.updateUser, data.userid).subscribe((data) => {
      this.RowData = this.adminservice.getuser();
    })

    this.updateUser.role.pop();

  }

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log('onCellValueChanged: ', event.data);

    this.RowData = this.adminservice.getuser();

  }

  flag: String = "";
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

  onGridReady(params: any) {
    console.log(params.api);

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  GetAgColumns() {
    this.ColumnDefs = [
      { headerName: 'First Name', field: 'firstname', length: 20, sortable: true, filter: true, editable: true, },
      { headerName: 'Last Name', field: 'lastname', length: 20, sortable: true, filter: true, editable: true, },
      { headerName: 'User Name', field: 'username', length: 20, sortable: true, filter: true, },
      {
        headerName: 'Role', field: 'role', cellRenderer: this.roleFunc, sortable: true, cellEditor: 'agSelectCellEditor', filter: true, editable: true, cellEditorParams: {
          values: ['QA', 'Developer', 'QA/Developer'],
        }
      },
      { headerName: 'Creator Name', field: 'creatorid', length: 20, cellRenderer: this.creatorFunc, sortable: true, filter: true, },
      { headerName: 'Created Time', field: 'createdtime', length: 20, sortable: true, filter: true, editable: false, },
      { headerName: 'Modified Time', field: 'modifiedtime', length: 20, sortable: true, filter: true, editable: false, },
      {
        headerName: 'Action', cellRenderer: "mycustomizecell",
        cellRendererParams: {
          cancelOtherRowEditors: this.cancelOtherRowEditors.bind(this)
        },
        width: 180
      }

    ];
    this.frameworkcomponent = {
      mycustomizecell: UserEditComponent
    }
  }


  cancelOtherRowEditors(currentRowIndex: any) {
    const renderers = this.gridApi.getCellRendererInstances();

  }

  onCellClicked(params: any) {
    if (params.node.field !== 'action') {
      this.cancelOtherRowEditors(params.node.rowIndex);
    }
  }



  roleFunc(params: any) {
    var paramValue = params.data.role;
    if (paramValue.length == 1)
      return paramValue[0].roleName;
    return paramValue[0].roleName + '/' + paramValue[1].roleName;
  }

  creatorFunc(params: any) {
    var paramValue = params.data.creatorid;
    var creatorFullName = '';
    if (paramValue != null)
      return creatorFullName = paramValue.firstname + ' ' + paramValue.lastname;
    return creatorFullName;
  }



  getSelectedRow() {
    //let selectedRow=this.gridApi.getSelectedRows();
    //console.log(selectedRow);
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

  register(f: NgForm) {
    this.newuser.creatorid = this.loogedinuser;
    let encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(this.publicKey);
    this.decryptPassword = encrypt.encrypt(this.encryptPassword.trim());
    this.newuser.password = this.decryptPassword;
    if (f.value.QA) {
      this.newuser.role.push({ "roleId": 2, "roleName": "QA" });
    }
    if (f.value.Developer) {
      this.newuser.role.push({ "roleId": 3, "roleName": "Developer" });
    }
    this.adminservice.insertEmployee(this.newuser).subscribe(data => {
      this.openSnackbar('User added successfully', "dismiss")
      this.ngOnInit();
    }, error => {
      this.openSnackbar('something went wrong', "dismiss")
    });
    this.modalService.dismissAll();
    this.newuser.role.pop();
    f.form.reset();

  }

  openSnackbar(message: any, action: any) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  usernameChanged(e: any) {
    this.adminservice.usernameExist(e).subscribe(userpresent => {
      if (userpresent != null)
        this.usernamepresent = true
      else {
        this.usernamepresent = false;
      }
    })
  }

  getCurrentUserId() {
    this.adminservice.getUserIdByUsername().subscribe(data => {
      this.loogedinuser = data;
    },
      error => {
        alert("something went wrong");
      });
  }
}
