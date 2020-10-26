import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  admin: any;
  baseUrl: string = "http://localhost:3000/api/admin";
  constructor(private http: HttpClient) { }
  isAdminLoggedIn = false;

  //Function to check that admin is loggedIn
  loggedIn() {
    return this.isAdminLoggedIn;
  }

  //Function for registering admin
  registerAdmin(admin) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/register', admin, { headers: headers });
  }

  //function for the logout
  logOut() {
    this.isAdminLoggedIn= false;
    this.authToken = null;
    this.admin = null;
    localStorage.clear();
  }

  //Function for Admin Login
  login(admin) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/login', admin, { headers: headers })
      .pipe(map((admin: any) => {
        this.isAdminLoggedIn = true;
        if (admin && admin.token) {
          this.storeAdminDate(admin.token, admin);
        }
        return admin;
      }));
  }

  //Storing Admin Date
  storeAdminDate(token, admin) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('admin', JSON.stringify(admin));
    this.authToken = token;
    this.admin = admin;
  }

  //For the Admin Profile
  getProfile(){
    let headers = new HttpHeaders({
      "Authorization": this.authToken,
      "Content-Type": 'application/json'
    });
    this.loadToken();
    return this.http.get(this.baseUrl+'/profile',{headers:headers}) 
  }

  //Loding token from local storage
  loadToken(){
    const token =localStorage.getItem('id_token');
    this.authToken=token;
  }
}
