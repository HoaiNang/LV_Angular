
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/Model/Customer';
import { MasterService } from 'src/app/_services/master.service';

import { PopupHangtsComponent } from '../popup-hangts/popup-hangts.component';
import { ToastrService } from 'ngx-toastr';
import { HangThuySan } from 'src/app/Model/HangTS';
import { HangTSService } from 'src/app/_services/hangts.service';

@Component({
  selector: 'app-hang-ts',
  templateUrl: './hang-ts.component.html',
  styleUrls: ['./hang-ts.component.css']
})
export class HangTSComponent {

  hangtslist !: HangThuySan[];
  dataSource: any;
  displayedColumns: string[] = ["Id Loai", "Ten Loai", "Ten Nguoi Tao", "Ngay Tao", "Toa Do", "isActive", "isDelete", "IdNV", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: MasterService,
    private HangThuySan: HangTSService,
    private dialog: MatDialog) {
    this.loadhangts();
  }


  loadhangts() {
    this.service.GetHangTS()
      .subscribe((data: any) => {
        this.hangtslist = data;
        this.dataSource = new MatTableDataSource<HangThuySan>(this.hangtslist);
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
      });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  Openpopup(code: any, title: any) {
    var _popup = this.dialog.open(PopupHangtsComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadhangts();
    })
  }
  addhangts(){
    this.Openpopup(0, 'Thêm Danh mục hàng thủy sản');
  }

  edithangts(code: any) {
    this.Openpopup(code, 'Cập nhật hàng thủy sản');
  }

  openDialog(code:any, tenLoai: any): void {
    this.dialog.open(DialogAnimationsDialog, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      //truyền thuộc tính sang DialogAnimationsDialog
      data: {
        code: code,
        tenLoai: tenLoai,
        tableComponent: this
      }
    });
  }
}

//component hiển thông báo khi xóa
@Component({
  selector: 'dialog-animations-dialog',
  templateUrl: 'hangts-dialog.component.html',
  styles:[`
  .red-heading {
    color: red;
  }
  `]

})
export class DialogAnimationsDialog {
  tenLoai:any;
  //khai báo constructor để nhận tham số data và lưu nó trong một thuộc tính data
  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogAnimationsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.tenLoai = this.data.tenLoai;
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
  //khi đồng ý xóa sẽ lấy dữ liệu truyền từ openDialog và gọi hàm DeleteCustomer để xóa
  accept() {
    const code = this.data.code;
    const tableComponent = this.data.tableComponent;
    tableComponent.service.DeleteHangTS(code).subscribe(() => {
      tableComponent.loadhangts();
      this.toastr.success(`Delete hangts ${this.data.tenLoai} success`);
    });
  }
}

