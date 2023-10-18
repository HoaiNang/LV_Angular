import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MasterService } from 'src/app/_services/master.service';
import { StorageService } from 'src/app/_services/storage.service';
import { DataSharingService } from '../../data-sharing.service';
@Component({
  selector: 'app-popup-hangts',
  templateUrl: './popup-hangts.component.html',
  styleUrls: ['./popup-hangts.component.css']
})
export class PopupHangtsComponent implements OnInit{
  [x: string]: any;
  coordinates: any;
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  isEdit: boolean = false;
  constructor(
    private toastr: ToastrService,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupHangtsComponent>,
    private buildr: FormBuilder,
    private service: MasterService,
    private dataSharingService: DataSharingService) {

  }
  // thêm một getter để dễ dàng truy cập các trường của form và kiểm tra trạng thái
  get formControls() {
    return this.myform.controls;
  }
  ngOnInit(): void {
    this.coordinates = this.dataSharingService.getCoordinates();
      if (this.coordinates) {
        this.myform.patchValue({ coords: this.coordinates.toString()});
      }
    this.inputdata = this.data?.title ? this.data : {};
    if (this.inputdata.code > 0) {
      this.isEdit = true;
      this.setpopupdata(this.inputdata.code);
    }
  }

  setpopupdata(IdLoai: any) {
    this.service.GetHangtsbyid(IdLoai).subscribe(item => {
      this.editdata = item;
      //console.log(item);
      this.myform.setValue({tenLoai:this.editdata.tenLoai, createUsername:this.editdata.createUsername, coords: this.coordinates, isActive:this.editdata.isActive,
      isDelete:this.editdata.isDelete,idNV:this.editdata.IdNV })
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    tenLoai: ['', Validators.required],
    createUsername: ['', Validators.required],
    coords: [],
    isActive: [true],
    isDelete: [false],
    idNV: this.storageService.getUser().id
  });

  Savehang() {
    // Kiểm tra tính hợp lệ của form
    if (this.myform.valid) {
      if (this.isEdit) {
        this.service.UpdateHangTS(this.inputdata.code, this.myform.value).subscribe(res => {
          this.toastr.success(`Update hang thuy san success!`);
          this.closepopup();
        });
      } else {
        this.service.SaveHangts(this.myform.value).subscribe(res => {
          this.closepopup();
          this.toastr.success('Add new hang thuy san success!');
        });
      }
    } else {
      // Đánh dấu tất cả các trường là đã chạm (touched) để hiển thị lỗi
      this.myform.markAllAsTouched();
    }
  }


}
