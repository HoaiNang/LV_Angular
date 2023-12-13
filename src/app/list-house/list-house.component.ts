import { Component, ViewChild } from '@angular/core';
import { House } from '../Model/House';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MasterService } from '../_services/master.service';
import { HouseService } from '../_services/house.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PopupHouseComponent } from '../popup-house/popup-house.component';
import { PopupDatphongComponent } from '../popup-datphong/popup-datphong.component';

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent {
  houselist !: House[];
  dataSource: any;
  baseUrl = 'http://localhost:8080/api/file/anh/';
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
    var _popup = this.dialog.open(PopupDatphongComponent, {
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
  

  edithouse(code: any) {
    this.Openpopup(code, 'Liên hệ đặt phòng');
  }
}


