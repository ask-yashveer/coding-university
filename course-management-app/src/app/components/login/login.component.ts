import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  email: string;
  password: string;
  masterPassword: string;

  constructor(private authService: AuthService, private formBulider: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBulider.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      masterPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    let admin = { email: this.loginForm.controls.email.value, password: this.loginForm.controls.password.value }
      this.authService.login(admin)
        .subscribe(data => {
          if (data.success != false) {
            Swal.fire({
              type: 'success',
              title: 'Logged In Successfully!',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['/choice']);
          }
          else {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'Admin Not Found!',
            })
          }
        },
          err => {
            console.log(err.stack);
            this.router.navigate(['/login']);
          })
  }
}
