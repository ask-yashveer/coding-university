import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(usersList: any, searchName: any) {
    let updatedUsersList: any;
    if (searchName[0] !== undefined && searchName[1] === "firstName") {
      updatedUsersList = usersList.filter(user => user.firstName.toLowerCase().startsWith(searchName[0].toLowerCase()));
    }

    else if (searchName[0] !== undefined && searchName[1] === "email") {
      updatedUsersList = usersList.filter(user => user.email.toLowerCase().startsWith(searchName[0].toLowerCase()));
    }

    else if (searchName[0] !== undefined && searchName[1] === "courseName") {
      updatedUsersList = usersList.filter(user => user.courseName.toLowerCase().startsWith(searchName[0].toLowerCase()));
    }

    else if (searchName[0] !== undefined && searchName[1] === "courseId") {
      updatedUsersList = usersList.filter(user => user.courseId.toLowerCase().startsWith(searchName[0].toLowerCase()));
    }

    else {
      updatedUsersList = usersList;
    }

    return updatedUsersList;
  }

}
