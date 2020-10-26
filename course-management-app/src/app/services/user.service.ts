import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../components/models/user-models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl:string = "http://localhost:3000/api/users";

  //Get All Users
  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  //Get User by ID {
  getUserById(id: string  ) {
    return this.http.get<User>(this.baseUrl + "/" + id);

  }

  //Add User
  createUsers(user: User) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl, user, { headers: headers });
  }

  //Modify User
  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/update/' + user._id, user);
  }

  //Delete User by ID
  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + "/" + id);
  }

  //Delete Courses of a User
  deleteCandCourse(uid: string, cid: string) {
    return this.http.delete(this.baseUrl+ "/" + uid + "/courses/" + cid);
  }
}