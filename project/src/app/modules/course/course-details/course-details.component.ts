

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { UserService } from '../../user/user.service';
import { Category } from '../category.model';
import { Lecturer } from '../../user/lecturer.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course!: Course ;
  lecturer = sessionStorage.getItem('currentLecturer');
  categories!: Category[];
  lecturers!: Lecturer[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.courseService.getCategory().subscribe(data => {
      this.categories = data;
    });
    this.userService.getLecturer().subscribe(data => {
      this.lecturers = data;
    });
    this.route.paramMap.subscribe(params => {
      const courseId = parseInt(params.get('id') || '');
      this.courseService.getByIdCourse(courseId).subscribe(course => {
        this.course = course;
        console.log(course)
      });
    });
  }

  isLecturer(): boolean {
    if (this.lecturer) {
      if (JSON.parse(this.lecturer).id == this.course?.lecturerId)
        return true;
    }
    return false;
  }

  editCourse(courseId: number | undefined) {
    this.router.navigate(['/addCourse'], { queryParams: { id: courseId } });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  }

  getLecturerName(lecturerId: number): string {
    const lecturer = this.lecturers.find(lect => lect.id === lecturerId);
    return lecturer ? lecturer.name : '';
  }
  isStartInNextWeek(startDate: any): boolean {
    if (!(startDate instanceof Date)) {
      startDate = new Date(startDate);
    }
  
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    const isNextWeek = startDate.getTime() >= today && startDate.getTime() <= nextWeek;
    return isNextWeek;
  }
  
 getCategoryImg():string{
  return this.categories[this.course.categoryId-1].iconPath;
 }
  
}
