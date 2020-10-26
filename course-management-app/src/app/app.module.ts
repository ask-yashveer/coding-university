import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NamePipe } from './pipes/name.pipe';
import { SelectComponent } from './components/select/select.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RegisterComponent } from './components/register/register.component';
import { ChoiceComponent } from './components/choice/choice.component';
import { ListCoursesComponent } from './components/list-courses/list-courses.component';
import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { EditCoursesComponent } from './components/edit-courses/edit-courses.component';
import { CoursePipe } from './pipes/course.pipe';
import { CandidateLoginComponent } from './components/candidate-login/candidate-login.component';
import { ViewcoursesComponent } from './components/viewcourses/viewcourses.component';
import { CandidateProfileComponent } from './components/candidate-profile/candidate-profile.component';
import { CandidateAddCourseComponent } from './components/candidate-add-course/candidate-add-course.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import * as jsPDF from 'jspdf';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    NamePipe,
    SelectComponent,
    AboutUsComponent,
    RegisterComponent,
    ChoiceComponent,
    ListCoursesComponent,
    AddCoursesComponent,
    EditCoursesComponent,
    CoursePipe,
    CandidateLoginComponent,
    ViewcoursesComponent,
    CandidateProfileComponent,
    CandidateAddCourseComponent,
    ContactUsComponent,
  ],
  imports: [   
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
