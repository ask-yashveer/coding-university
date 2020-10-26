import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../components/models/course-models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  //Initailizing the base URL
  baseUrl:string = "http://localhost:3000/api/courses";

  //Getting Courses
  getCourse() {
    return this.http.get<Course[]>(this.baseUrl);
  }

  //Getting Courses by Id
  getCourseById(id: string  ) {
    return this.http.get<Course>(this.baseUrl + "/" + id);
  }

  //Creating new courses
  createCourse(course: Course) {
    return this.http.post(this.baseUrl, course);
  }

  //Updating existing courses
  updateCourse(course: Course) {
    return this.http.put(this.baseUrl + "/" + course._id, course);
  }

  //Deleting existing courses
  deleteCourse(id: string) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}