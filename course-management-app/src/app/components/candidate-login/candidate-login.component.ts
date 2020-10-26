import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthcandidateService } from 'src/app/services/authcandidate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-login',
  templateUrl: './candidate-login.component.html',
  styleUrls: ['./candidate-login.component.css']
})
export class CandidateLoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  email: string;
  password: string;

  constructor(private authcandidateService: AuthcandidateService, private formBulider: FormBuilder, private router: Router) { }

  //ngOnInit() lifecycle hook for initialization
  ngOnInit() {
    this.loginForm = this.formBulider.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    let candidate = { email: this.loginForm.controls.email.value, password: this.loginForm.controls.password.value }

    this.authcandidateService.login(candidate)
      .subscribe(data => {
        if (data.success != false) {
          this.router.navigate(['/candidate-profile']);

          Swal.fire({
            type: 'success',
            title: 'Logged In Successfully!',
            showConfirmButton: false,
            timer: 1500
          })

        }
        else {
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Candidate Not Found!',
          })
        }
      },
        err => {
          console.log(err.stack);
          this.router.navigate(['/candidate-login']);
        })
  }
}
