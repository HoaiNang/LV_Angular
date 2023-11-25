import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Contact } from '../Model/Contacts';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '../_services/master.service';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-manager',
  templateUrl: './contacts-manager.component.html',
  styleUrls: ['./contacts-manager.component.css']
})
export class ContactsManagerComponent {
  contactslist !: Contact[];
  dataSource: any;
  displayedColumns: string[] = ["STT", "Ho va ten", "Email", "Noi dung", "Id nguoi tao", "Ngay tao", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(
    private service: MasterService,
    private contacts: ContactsService,
    private dialog: MatDialog){
    this.loadcomment();}

  loadcomment() {
    this.service.GetContact()
      .subscribe((data: any) => {
        this.contactslist = data;
        this.dataSource = new MatTableDataSource<Contact>(this.contactslist);
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
        console.log(data)
      });}
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
}
