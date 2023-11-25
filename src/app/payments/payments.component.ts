import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  paymentData = {
    amount: 0,  // Số tiền thanh toán
    orderCode: '',  // Mã đơn hàng
  };
  paymentUrl: any;  // Biến lưu URL thanh toán từ Spring Boot API

  constructor(private http: HttpClient) { }

  createPayment() {
    // Gửi yêu cầu thanh toán tới Spring Boot API
    this.http.post('http://localhost:8080/vnpay', this.paymentData).subscribe((response: any) => {
      // Nhận URL thanh toán từ API và chuyển hướng người dùng đến đó
      this.paymentUrl = response.paymentUrl;
    });
  }
}
