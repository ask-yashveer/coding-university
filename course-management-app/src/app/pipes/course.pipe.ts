import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'course'
})
export class CoursePipe implements PipeTransform {

  transform(coursesList: any, searchName: any): any {
    let updatedCoursesList: any;
    if (searchName[0] !== undefined && searchName[1] === "courseName") {
      updatedCoursesList = coursesList.filter(course => course.courseName.toLowerCase().startsWith(searchName[0].toLowerCase()));
    }

    else if (searchName[0] !== undefined && searchName[1] === "courseId") {
      updatedCoursesList = coursesList.filter(course => course.courseId.toLowerCase().startsWith(searchName[0].toLowerCase()));
    }
    else {

      updatedCoursesList = coursesList;
    }

    return updatedCoursesList;
  }

}
