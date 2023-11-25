import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../_services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../_services/master.service';
import { DataSharingService } from '../data-sharing.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-popup-datphong',
  templateUrl: './popup-datphong.component.html',
  styleUrls: ['./popup-datphong.component.css']
})
export class PopupDatphongComponent {
  datphongForm: FormGroup;
  contacts: any[] = [];
  API_URL = 'http://localhost:8080/';
  constructor(private fb: FormBuilder, private http: HttpClient, private service: StorageService) {
    this.datphongForm = this.fb.group({
      fullname: [''],
      email: [''],
      phone: [''],
      CCCD: [''],
      user_id: this.service.getUser().username
    });
  }
  onSubmit() {
    const formData = this.datphongForm.value;
    this.saveContact(formData);
  }
  saveContact(formData: any) {
    throw new Error('Method not implemented.');
  }
}
