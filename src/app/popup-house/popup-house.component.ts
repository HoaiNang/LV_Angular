import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../_services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../_services/master.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-popup-house',
  templateUrl: './popup-house.component.html',
  styleUrls: ['./popup-house.component.css']
})
export class PopupHouseComponent {
  coordinates: any;
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  isEdit: boolean = false;
  constructor(
    private toastr: ToastrService,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupHouseComponent>,
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

  setpopupdata(id: any) {
    this.service.GetHousebyid(id).subscribe(item => {
      this.editdata = item;
      //console.log(item);
      this.myform.setValue({id: this.editdata.id, title:this.editdata.title, desc:this.editdata.desc, coords: this.coordinates, addr:this.editdata.addr, 
      phone:this.editdata.phone, nroom: this.editdata.nroom, nbroom:this.editdata.nbroom, rent_price: this.editdata.rent_price,
      image:this.editdata.image, user_id:this.editdata.user_id })
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    id:[],
    title: ['', Validators.required],
    desc: ['', Validators.required],
    coords: [],
    addr: ['', Validators.required],
    phone: ['', Validators.required],
    nroom: ['', Validators.required],
    nbroom: ['', Validators.required],
    rent_price: ['', Validators.required],
    image: ['', Validators.required],
    user_id: this.storageService.getUser().id
  });

  Savehouse() {
    // Kiểm tra tính hợp lệ của form
    if (this.myform.valid) {
      if (this.isEdit) {
        this.service.UpdateHouse(this.inputdata.code, this.myform.value).subscribe(res => {
          this.toastr.success(`Cập nhật thành công!`);
          this.closepopup();
        });
      } else {
        this.service.SaveHouse(this.myform.value).subscribe(res => {
          this.closepopup();
          this.toastr.success('Thêm mới thành công!');
        });
      }
    } else {
      // Đánh dấu tất cả các trường là đã chạm (touched) để hiển thị lỗi
      this.myform.markAllAsTouched();
    }
  }
}
