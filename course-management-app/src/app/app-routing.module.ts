import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { SelectComponent } from './components/select/select.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ChoiceComponent } from './components/choice/choice.component';
import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { ListCoursesComponent } from './components/list-courses/list-courses.component';
import { EditCoursesComponent } from './components/edit-courses/edit-courses.component';
import { CandidateLoginComponent } from './components/candidate-login/candidate-login.component';
import { ViewcoursesComponent } from './components/viewcourses/viewcourses.component';
import { CandidateProfileComponent } from './components/candidate-profile/candidate-profile.component';
import { CandidateAddCourseComponent } from './components/candidate-add-course/candidate-add-course.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'add-user', component:AddUserComponent, canActivate: [AuthGuard]},
  {path:'add-courses', component:AddCoursesComponent, canActivate: [AuthGuard]},
  {path:'list-user', component:ListUserComponent, canActivate: [AuthGuard]},
  {path:'list-courses', component:ListCoursesComponent, canActivate: [AuthGuard]},
  {path:'choice', component:ChoiceComponent, canActivate: [AuthGuard]},
  {path:'about-us', component:AboutUsComponent},
  {path:'contact-us', component:ContactUsComponent},
  {path:'register', component:RegisterComponent},
  {path:'view-courses', component:ViewcoursesComponent, canActivate: [AuthGuard]},
  //Editing Candidate with the help of Id
  {path:'candidate-add-course/:id', component:CandidateAddCourseComponent, canActivate: [AuthGuard]},
  //Editing User with the help of Id
  {path:'edit-user/:id', component:EditUserComponent, canActivate: [AuthGuard]},
  //Editing Courses with the help of Id
  {path:'edit-courses/:id', component:EditCoursesComponent, canActivate: [AuthGuard]},
  {path:'select', component:SelectComponent},
  {path:'view-courses', component:ViewcoursesComponent, canActivate: [AuthGuard]},
  {path:'candidate-login', component:CandidateLoginComponent},
  {path:'candidate-profile', component:CandidateProfileComponent},
  {path:'**', component:HomeComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
