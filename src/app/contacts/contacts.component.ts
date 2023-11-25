import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../_services/master.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../_services/storage.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contactForm: FormGroup;
  contacts: any[] = [];
  API_URL = 'http://localhost:8080/';
  constructor(private fb: FormBuilder, private http: HttpClient, private service: StorageService) {
    this.contactForm = this.fb.group({
      fullname: [''],
      email: [''],
      des: [''],
      user_id: this.service.getUser().username
    });
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.http.get(this.API_URL + 'contacts').subscribe((data: any) => {
      this.contacts = data;
    });
  }

  onSubmit() {
    const formData = this.contactForm.value;
    this.saveContact(formData);
  }

  saveContact(data: any) {
    this.http.post(this.API_URL + 'contacts', data).subscribe((response: any) => {
      this.contacts.push(response);
      this.contactForm.reset();
    });
  }

  updateContact(code: any, data: any) {
    this.http.put(this.API_URL + 'contacts/' + code, data).subscribe(() => {
      this.getContacts();
    });
  }

  deleteContact(code: any) {
    this.http.delete(this.API_URL + 'contacts/' + code).subscribe(() => {
      this.contacts = this.contacts.filter(contact => contact.code !== code);
    });
  }

  // Các phương thức khác liên quan đến xem chi tiết, sửa, xóa
}

