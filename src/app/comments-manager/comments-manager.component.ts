import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MasterService } from '../_services/master.service';
import { CommentsService } from '../comments.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-comments-manager',
  templateUrl: './comments-manager.component.html',
  styleUrls: ['./comments-manager.component.css']
})
export class CommentsManagerComponent {
  commentslist !: Comment[];
  dataSource: any;
  displayedColumns: string[] = ["STT","Id nguoi tao", "Ngay tao", "Noi dung", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(
    private service: MasterService,
    private comments: CommentsService,
    private dialog: MatDialog){
    this.loadcomment();}

  loadcomment() {
    this.service.GetComment()
      .subscribe((data: any) => {
        this.commentslist = data;
        this.dataSource = new MatTableDataSource<Comment>(this.commentslist);
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
        console.log(data)
      });}

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
}
