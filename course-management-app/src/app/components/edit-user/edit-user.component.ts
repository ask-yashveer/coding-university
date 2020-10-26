import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user-models';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../models/course-models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  courses: Course[];
  editForm: FormGroup;
  submitted: boolean = false;
  userId: string;
  user: User;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserService, private courseService: CourseService) {
    this.route.params.subscribe(params => { this.userId = params['id'] });
  }
  ngOnInit() {

    if (this.userId != null) {
      if (!this.userId) {
        alert("Invalid Action");
        this.router.navigate(['list-user']);
        return;
      }
      this.editForm = this.formBuilder.group({
        _id: [this.userId],
        firstName: [{ value: '', disabled: true }, [Validators.required, Validators.pattern("[A-Z][a-z]{2,14}")]],
        lastName: [{ value: '', disabled: true }, [Validators.required, Validators.pattern("[A-Z][a-z]{2,14}")]],
        age: ['', [Validators.required, Validators.min(20), Validators.max(30)]],
        mobileNumber: ['', [Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
        email: ['', [Validators.required, Validators.email]],
        courses: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.courseService.getCourse().subscribe(data => {
        this.courses = data;
      }, err => {
        console.log(err.stack);
      });
      this.userService.getUserById(this.userId).subscribe(data => {
        this.editForm.setValue(data);
      });
    }
    else if (localStorage.getItem("username") != null) {
      this.router.navigate(['/login']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }//end of ngOnInit() function

  logOutUser(): void {
    this.authService.logOut();
    Swal.fire({
      type: 'success',
      title: 'Logged out Successfully!',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.userService.updateUser(this.editForm.getRawValue()).subscribe(data => {
      this.router.navigate(['list-user']);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Candidate updated successfully!',
        showConfirmButton: false,
        timer: 1500
      })
    },
      err => {
        console.log(err.stack);
      }
    );
  }
}

