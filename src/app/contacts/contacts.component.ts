import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contactForm: FormGroup; // Biểu mẫu liên hệ
  submitted = false; // Biến để kiểm tra xem biểu mẫu đã được gửi đi hay chưa

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required], // Tên người gửi
      email: ['', [Validators.required, Validators.email]], // Email người gửi
      message: ['', Validators.required] // Nội dung tin nhắn
    });
  }

  // Phương thức này được gọi khi người dùng gửi biểu mẫu
  onSubmit() {
    this.submitted = true;

    // Kiểm tra nếu biểu mẫu không hợp lệ thì không thực hiện gì
    if (this.contactForm.invalid) {
      return;
    }

    // Gửi dữ liệu biểu mẫu lên máy chủ hoặc thực hiện các hành động liên quan đến liên hệ với admin ở đây
  }
}
