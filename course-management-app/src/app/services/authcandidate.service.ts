import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthcandidateService {

  authToken: any;
  candidate: any;
  baseUrl: string = "http://localhost:3000/api/userlogin";
  constructor(private http: HttpClient) { }
  isCandidateLoggedIn = false;

  //Checking Candidate id loggedIn
  loggedIn() {
    return this.isCandidateLoggedIn;
  }

  //Function for Candidate Logout
  logOut() {
    this.isCandidateLoggedIn = false;
    this.authToken = null;
    this.candidate = null;
    localStorage.clear();
  }

  //Function for Candidate Login
  login(candidate) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/login', candidate, { headers: headers })
      .pipe(map((candidate: any) => {
        this.isCandidateLoggedIn = true;
        if (candidate && candidate.token) {
          this.storeCandidateDate(candidate.token, candidate);
        }
        return candidate;
      }));
  }

  //Function to store the Candidate Date
  storeCandidateDate(token, candidate) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(candidate));
    this.authToken = token;
    this.candidate = candidate;
  }

  //For getting the user profile
  getProfile() {
    let headers = new HttpHeaders({
      "Authorization": this.authToken,
      "Content-Type": 'application/json'
    });
    this.loadToken();
    return this.http.get(this.baseUrl + '/profile', { headers: headers })
  }

  //Loading token from local storage
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
