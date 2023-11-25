import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    fullname: null,
    email: null,
    phone: null,
    sCCCD: null,
    username: null,
    password: null,
    repassword: null,
    isActive: false
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password, fullname, sCCCD, repassword, phone,  isActive } = this.form;

    this.authService.register(username, email, password, fullname, sCCCD, repassword, phone, isActive).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/home']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
