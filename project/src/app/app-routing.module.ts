import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/user/login/login.component';
import { RegisterComponent } from './modules/user/register/register.component';
import { AllCoursesComponent } from './modules/course/all-courses/all-courses.component';
import { LogoutComponent } from './modules/user/logout/logout.component';
import { AddCourseComponent } from './modules/course/add-course/add-course.component';
import { CourseDetailsComponent } from './modules/course/course-details/course-details.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "logout", component: LogoutComponent },
  { path: "allCourses", component: AllCoursesComponent },
  { path: "addCourse", component: AddCourseComponent },
  { path: "courseDetails/:id", component: CourseDetailsComponent },
  { path: 'editCourse/:id', component: AddCourseComponent }
  // { path: "**", component: PageNotFoundComponent  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
