import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from '../models/course-models';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean = false;
  course: Course[];

  constructor(private formBuilder: FormBuilder, private router: Router, private courseService: CourseService) { }

  //ngOnInit() lifecycle hook for initialization
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      courseId: ['', [Validators.required, Validators.pattern("[C][U][0-9]{4}")]],
      courseName: ['', Validators.required],
      courseDuration: ['', Validators.required],
      courseFee: ['', Validators.required],
    });


    //subscribing the data
    this.courseService.getCourse().subscribe(data => {
      //on resolve
      this.course = data;
    }, err => {
      //on reject
      console.log(err.stack);
    });
  }

  // checkId(event: any): void {
  //   this.courseService.getCourse().subscribe(data => {
  //     this.course=data;
  //   }, err => {
  //     console.log(err.stack);
  //   });
  // }

  //to submit the form data
  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.courseService.createCourse(this.addForm.value).subscribe(data => {
      this.router.navigate(['list-courses']);

      //Sweet alert
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Course added successfully!',
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