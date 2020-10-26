import {Course} from './course-models' 
export class User{
    _id:string;
    firstName:string;
    lastName:string;
    age:number;
    mobileNumber:string;
    email:string;
    password:string;
    courses:Course[];
}