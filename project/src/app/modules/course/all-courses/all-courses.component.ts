
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });


  }

  onCourseSelected(c: Course) {
    if(sessionStorage.getItem('currentUser')||sessionStorage.getItem('currentLecturer'))
    this.router.navigate([`/courseDetails/${c.id}`]);
}


}
