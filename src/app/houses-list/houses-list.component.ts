import { Component, Inject, ViewChild } from '@angular/core';
import {House} from 'src/app/Model/House';
import { MasterService } from '../_services/master.service';
import { HouseService } from '../_services/house.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupHouseComponent } from '../popup-house/popup-house.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.css'],
})
export class HousesListComponent {
  houselist !: House[];
  dataSource: any;
  displayedColumns: string[] = ["STT", "Ten Nha Tro", "Dia Chi", "Mo Ta", "Gia Thue","SDT Lien He", "SL Phong Trong", "Hinh Anh", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(
    private service: MasterService,
    private House: HouseService,
    private dialog: MatDialog){
    this.loadhouse();}

  loadhouse() {
    this.service.GetHouse()
      .subscribe((data: any) => {
        this.houselist = data;
        this.dataSource = new MatTableDataSource<House>(this.houselist);
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
        console.log(data)
      });
  }
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  Openpopup(code: any, title: any) {
    var _popup = this.dialog.open(PopupHouseComponent, {
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
      this.loadhouse();
    })
  }
  addhouse(){
    this.Openpopup(0, 'Thêm nhà trọ');
  }

  edithouse(code: any) {
    this.Openpopup(code, 'Cập nhật thông tin nhà trọ');
  }

  openDialog(code:any, title: any): void {
    this.dialog.open(DialogAnimationsDialog, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      //truyền thuộc tính sang DialogAnimationsDialog
      data: {
        code: code,
        title: title,
        tableComponent: this
      }
    });
  }
}

//component hiển thông báo khi xóa
@Component({
  selector: 'dialog-animations-dialog',
  templateUrl: 'house-dialog.html',
  styles:[`
  .red-heading {
    color: red;
  }
  `]

})
export class DialogAnimationsDialog {
  title:any;
  //khai báo constructor để nhận tham số data và lưu nó trong một thuộc tính data
  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogAnimationsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.title = this.data.title;
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
  //khi đồng ý xóa sẽ lấy dữ liệu truyền từ openDialog và gọi hàm DeleteCustomer để xóa
  accept() {
    const code = this.data.code;
    const tableComponent = this.data.tableComponent;
    tableComponent.service.DeleteHouse(code).subscribe(() => {
      tableComponent.loadhouse();
      this.toastr.success(`${this.data.title} đã xóa thành công!`);
    });
  }

}
