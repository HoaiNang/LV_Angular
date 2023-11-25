import { Component, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../Model/User';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MasterService } from '../_services/master.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.css']
})
export class UsersManagerComponent {
  userlist !: User[];
  dataSource: any;
  displayedColumns: string[] = ["STT", "Ho va ten", "So dien thoai", "Email", "Username", "Trang thai", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: MasterService,
    private user: UserService,
    private http: HttpClient,
    private dialog: MatDialog){
    this.loaduser();}

  loaduser() {
    this.service.GetUser()
      .subscribe((data: any) => {
        this.userlist = data;
        this.dataSource = new MatTableDataSource<User>(this.userlist);
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
        console.log(data)
      });
  }
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  kichHoatTaiKhoan(element: any) {
    // Thay đổi trạng thái của element tại đây
    element.isActive = !element.isActive;
  }
  DeleteUser(code: any) {
    console.log(code);

    // Gọi API để xóa người dùng
    this.http.delete(`http://localhost:8080/user/${code}`).subscribe(
      (response) => {
        // Xử lý kết quả sau khi xóa thành công (thường là cập nhật danh sách người dùng)
        return this.loaduser();
      },
      (error) => {
        alert("Không thể xóa user này!")
      }
    );
  }
}
