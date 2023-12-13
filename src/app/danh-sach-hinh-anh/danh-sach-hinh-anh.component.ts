import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LuuAnhService } from '../luu-anh.service';
import { ThemLuuAnhComponent } from '../them-luu-anh/them-luu-anh.component';

@Component({
  selector: 'app-danh-sach-hinh-anh',
  templateUrl: './danh-sach-hinh-anh.component.html',
  styleUrls: ['./danh-sach-hinh-anh.component.css'],
})
export class DanhSachHinhAnhComponent implements OnInit {
  luuAnhList: any[] = [];
  //link hiển thị hình ảnh
  baseUrl = 'http://localhost:8080/api/file/anh/';
  constructor(private luuAnhService: LuuAnhService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadLuuAnhList();
  }

  loadLuuAnhList(): void {
    this.luuAnhService.getLuuAnhList().subscribe({
      next: (data) => {
        console.log(data);
        this.luuAnhList = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openThemLuuAnhDialog(): void {
    const dialogRef = this.dialog.open(ThemLuuAnhComponent, {
      width: '400px', // Đặt kích thước theo ý muốn
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadLuuAnhList();
    });
  }

  taiFile(item: any) {
    this.luuAnhService.downloadFile(item.id).subscribe({
      next: (response) => {
        const blob = new Blob([response.body as Blob], {
          type: 'application/octet-stream',
        });

        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        //lấy tên file
        a.download = item.url;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error: (err) => {
        alert('Tải thất bại');
      },
    });
  }
}
