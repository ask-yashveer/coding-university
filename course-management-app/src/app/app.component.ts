import { Component } from '@angular/core';
import { AuthcandidateService } from './services/authcandidate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Coding University';
  todaysDate = new Date();

  constructor(private authService: AuthcandidateService) {
    setInterval(() => {
      this.todaysDate = new Date();
    }, 1000);
  }
}