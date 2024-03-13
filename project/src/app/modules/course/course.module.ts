import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AllCoursesComponent } from "./all-courses/all-courses.component";
import { AddCourseComponent } from "./add-course/add-course.component";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { CourseService } from "./course.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "src/app/app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LearningModeIconPipe } from "./learning-mode-icon.pipe";
// import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'

@NgModule({
    declarations: [AllCoursesComponent,AddCourseComponent,CourseDetailsComponent,LearningModeIconPipe],
    imports: [CommonModule,BrowserModule, AppRoutingModule, FormsModule,HttpClientModule,ReactiveFormsModule ,MatInputModule],
    providers: [CourseService],
    exports: [AllCoursesComponent,AddCourseComponent]
})

export class CourseModule {
}