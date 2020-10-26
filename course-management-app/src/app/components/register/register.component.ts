import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  name: string;
  email: string;
  password: string;
  submitted: boolean = false;
  masterPassword:string;
  constructor(private formBulider: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBulider.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      masterPassword: ['', Validators.required]

    });
  }
//Start of onSubmit() function
  onSubmit() {
      this.submitted = true;
      let admin = {
        name: this.registerForm.controls.name.value,
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value
      }
      //To check Master Password
      if (this.registerForm.controls.masterPassword.value == "coursemanagement") {
      this.authService.registerAdmin(admin)
        .subscribe(data => {
          Swal.fire({
            type: 'success',
            title: 'Registered Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/login']);
        },
          err => {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'Some error has occured!',
            })
            this.router.navigate(['/register']);
          }
        )
    }
    else {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'Master Password is Wrong!',
      })
      // alert("Error");
      this.router.navigate(['/register']);
    }
  }
}