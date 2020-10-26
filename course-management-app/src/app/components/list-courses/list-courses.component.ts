import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course-models';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {

  course: Course[];
  searchText: any;
  p: number = 1;

  constructor(private authService: AuthService, private router: Router, private courseService: CourseService) { }

  //ngOnInit() lifecycle hook
  ngOnInit() {
    this.courseService.getCourse().subscribe(data => {
      this.course = data;
    }, err => {
      console.log(err.stack);
    });
  }

  //Log out function for user
  logOutUser(): void{
    this.authService.logOut();
    Swal.fire({
      type: 'warning',
      title: "You are Logged Out",
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/login']);
  }

  //Delete Course Operation
  deleteCourse(course: Course): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {

    if (result.value) {
      this.courseService.deleteCourse(course._id).subscribe(data => {
        this.course = this.course.filter(u => u != course);
      })

      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Course deleted!',
        'success'
      )
    }
    else if (

      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        '',
        'error'
      )
    }
  })
}

  //Redirecting to addCourse component
  addCourse(): void {
    this.router.navigate(['add-courses']);
  }

  //Redirecting to editCourse component
  editCourse(course: Course):void{
    this.router.navigate(['edit-courses',course._id]);
  }

}
