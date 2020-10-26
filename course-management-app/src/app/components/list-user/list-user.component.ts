import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user-models';
import { AuthService } from 'src/app/services/auth.service';
import { Course } from '../models/course-models';
import { CourseService } from 'src/app/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  //creating an Array of User class
  users: User[];
  courses: Course[];

  //filtering  by name
  searchText: any;
  btnId: string;
  courseList: Course[];
  p: number = 1;

  //Constructor Dependency Injection
  constructor(private authService: AuthService, private router: Router, private userService: UserService, private courseService: CourseService) { }

  //ngOnInit() lifecycle hook
  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    }, err => {
      console.log(err.stack);
    });
  }

  //Adding Courses
  addCourse(user: User): void {
    this.router.navigate(['candidate-add-course', user._id]);
  }

  //Logout Functions
  logOutUser(): void {
    this.authService.logOut();
    Swal.fire({
      type: 'warning',
      title: "You are Logged Out",
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/login']);
  }

  //View Courses Function
  viewCourses(id: string) {
    this.userService.getUserById(id).subscribe(data => { this.btnId = id; this.courseList = data.courses;})
  }

  //Delete course Function inside users
  deleteCourse(uid: string, cid: string): void {
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
      if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          '',
          'error'
        )
      }
      else if (result) {
      this.userService.deleteCandCourse(uid, cid).subscribe((data: any) => {
      })
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Course deleted!',
        'success'
      )
    }
  })
}

//Deleting Users
  deleteUser(user: User): void {
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
      if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          '',
          'error'
        )
      }
      else if (result) {
        this.userService.deleteUser(user._id).subscribe(data => {
          this.users = this.users.filter(u => u != user);
        })
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Candidate entry deleted!',
          'success'
        )
      }
    })
  }

  //Resetting the button ID
  reset() {
    this.btnId = "";
  }

  //Redirecting to add-user componenent
  addUser(): void {
    this.router.navigate(['add-user']);
  }

  //Redirecting to edit-user componenent
  editUser(user: User): void {
    this.router.navigate(['edit-user', user._id]);
  }

}
