import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICellRenderer, ICellRendererParams } from 'ag-grid-community';
@Component({
  selector: 'app-user-edit',
  template: `
  <button type="button" style=" margin-top: -6px"  (click) = "onEditClick()" data-action-type="view" class="btn btn-default">
           <mat-icon>create</mat-icon>
           </button>`,
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit, ICellRenderer {
  rowdata: any = []
  public params: any;
  public isNew: any;
  constructor(private modalService: NgbModal) { this.isNew = true; }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  ngOnInit(): void {
  }
  agInit(params: any) {
    this.params = params;
  }
  public invokeParentMethod() {
    this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
  }

  onEditClick(this: any) {
    const index = this.params.node.rowIndex;
    this.params.cancelOtherRowEditors(index);
    console.log(index);
    var val = "";
    let cols = this.params.columnApi.getAllGridColumns();
    let firstCol = {
      "colId": ""
    }
    if (cols) {
      firstCol = cols[0];
      console.log(firstCol.colId, 'STATUS HEADER COME');
      if (firstCol.colId == 'statusid_fk')
        val = "statusid_fk"
      else if (firstCol.colId == 'firstname')
        val = "firstname"
      else if (firstCol.colId == 'projectName')
        val = "projectName"
    }
    let rowIndex = this.params.node.rowIndex;
    this.params.api.setFocusedCell(rowIndex, val);
    this.params.api.startEditingCell({
      rowIndex: rowIndex,
      colKey: val
    });
  }

  onUpdateClick() {
    this.isNew = true;
    let obj: any = {};
    obj.type = "update";
    this.params.api.stopEditing();
    obj.selectedData = [this.params.data];
    // update logic ....
  }

}
