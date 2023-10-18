import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  comment: string = ''; // Nội dung bình luận
  comments: string[] = []; // Mảng lưu trữ bình luận đã được đăng

  // Phương thức này được gọi khi người dùng gửi bình luận
  onSubmitComment() {
    if (this.comment) {
      this.comments.push(this.comment); // Thêm bình luận vào mảng
      this.comment = ''; // Xóa nội dung bình luận sau khi gửi
    }
  }
}

