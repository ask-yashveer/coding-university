import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from '../models/course-models';
import { User } from '../models/user-models';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-add-course',
  templateUrl: './candidate-add-course.component.html',
  styleUrls: ['./candidate-add-course.component.css']
})
export class CandidateAddCourseComponent implements OnInit {

  courses: Course[];
  newCourses: Course[];
  editForm: FormGroup;
  submitted: boolean = false;
  userId: string;
  user: User;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: UserService, private courseService: CourseService) {
    this.route.params.subscribe(params => { this.userId = params['id']; });
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
        age: [{ value: '', disabled: false }, [Validators.required, Validators.min(20), Validators.max(30)]],
        mobileNumber: [{ value: '', disabled: true }, [Validators.required, Validators.pattern("[6-9][0-9]{9}")]],
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        courses: ['', Validators.required],
        password: [{ value: '', disabled: true }, Validators.required]
      });

      this.userService.getUserById(this.userId).subscribe(data => {
        this.user = data;
        this.editForm.setValue(data);
        this.newCourses = this.user.courses;
        this.courseService.getCourse().subscribe((data: any) => {
          this.courses = data;
          for (let course of this.user.courses) {
            this.courses = this.courses.filter(c => c.courseName != course.courseName)
          }
        })
      });
    }
    else if (localStorage.getItem("username") != null) {
      this.router.navigate(['/login']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    this.submitted = true;
    let obj = this.editForm.controls.courses.value;
    let temp = this.newCourses;
    if (obj.length >= 0) {
      for (var course of obj) {
        temp.push(course)
      }
    }

    let updatedCourseList = this.editForm.getRawValue();
    updatedCourseList.courses = temp;
    this.userService.updateUser(updatedCourseList).subscribe(data => {
      this.router.navigate(['/list-user'])
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
