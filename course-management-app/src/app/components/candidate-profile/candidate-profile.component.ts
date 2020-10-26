import { Component, OnInit } from '@angular/core';
import { AuthcandidateService } from 'src/app/services/authcandidate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {
  User = {};
  enrolledCourses = [] ;
  constructor(private authCandService: AuthcandidateService) { }

  //ngOnInit() Lifecycle Hook
  ngOnInit() {
    var userDetails = localStorage.getItem('user');
    userDetails = JSON.parse(userDetails);
    userDetails = userDetails.user;
    this.User = userDetails;
    this.enrolledCourses = this.User.courses;
  }
  //Logout Function
  logout(){
    this.authCandService.logOut();
    Swal.fire({
      type: 'success',
      title: 'Logged out Successfully!',
      showConfirmButton: false,
      timer: 1500
    })
  }
}