import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from '../models/course-models';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit {

  editForm: FormGroup;
  submitted: boolean = false;
  courseId:string;
  course: Course;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private route:ActivatedRoute, private userService: CourseService) {  
    this.route.params.subscribe(params => { this.courseId = params['id'];
});
}
  ngOnInit() {
    if(this.courseId !=null){
      if(!this.courseId){
        alert("Invalid Action");
        this.router.navigate(['list-courses']);
        return;
      }
      this.editForm=this.formBuilder.group({
        _id:[this.courseId],
        courseId: [{value:'',disabled: true}, [Validators.required, Validators.pattern("[C][U][0-9]{4}")]],
        courseName: ['', Validators.required],
        courseDuration: ['', Validators.required],
        courseFee: ['', Validators.required],
      });
      this.userService.getCourseById(this.courseId).subscribe(data=>{
        this.editForm.setValue(data);
      });
    }
    else if(localStorage.getItem("username") != null ){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  logOutUser(): void{
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
    this.userService.updateCourse(this.editForm.getRawValue()).subscribe(data => {
      this.router.navigate(['list-courses']);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Course updated successfully!',
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
