import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../models/user-models';
import { Course } from '../models/course-models';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  courses: Course[];
  users: User[]
  addForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private courseService: CourseService) { }

  //ngOnInit() lifecycle hook for initialization
  ngOnInit() {

    this.addForm = this.formBuilder.group({
      _id: [],
      firstName: ['', [Validators.required, Validators.pattern("[A-Z][a-z]{2,14}")]],
      lastName: ['', [Validators.required, Validators.pattern("[A-Z][a-z]{2,14}")]],
      age: ['', [Validators.required, Validators.min(20), Validators.max(30)]],
      mobileNumber: ['', [Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
      courses: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.courseService.getCourse().subscribe(data => {
      this.courses = data;
    }, err => {
      console.log(err.stack);
    });
  }

  checkId(event: any): void {
    this.userService.getUsers().subscribe(data => {
      this.users=data;
    }, err => {
      console.log(err.stack);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    let user = {
      firstName: this.addForm.controls.firstName.value,
      lastName: this.addForm.controls.lastName.value,
      age: this.addForm.controls.age.value,
      courses: this.addForm.controls.courses.value,
      email: this.addForm.controls.email.value,
      password: this.addForm.controls.password.value
    }
    //subscribing to the userServices create user to submit the form data
    this.userService.createUsers(this.addForm.value).subscribe(data => {
      this.router.navigate(['list-user']);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Candidate added successfully!',
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
