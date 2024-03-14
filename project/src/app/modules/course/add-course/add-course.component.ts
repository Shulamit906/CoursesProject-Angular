
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../course.service';
import { Course, LearningMode } from '../course.model';
import { Lecturer } from '../../user/lecturer.model';
import { Category } from '../category.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  categories!: Category[];
  lecturers!: Lecturer[];
  courseId!: number
  course!: Course;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private courseService: CourseService, private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
    this.addSyllabus();
    this.courseService.getCategory().subscribe(data => {
      this.categories = data
    })
    this.userService.getLecturer().subscribe(data => {
      this.lecturers = data
    })

    this.route.queryParams.subscribe(params => {
      this.courseId = params['id'];
      console.log("courseId", this.courseId)
      if (this.courseId) {
        this.courseService.getByIdCourse(this.courseId).subscribe(course => {
          this.fetchf(course);
          this.course = course;
        });
      }
    });
  }


  public fetchf(course: Course): void {
    this.courseForm.patchValue({
      name: course.name,
      categoryId: course.categoryId,
      lessonCount: course.lessonCount,
      startDate: course.startDate,
      learningMode: course.learningMode,
      lecturerId: course.lecturerId,
      image: course.image
    });

    while (this.syllabusControls.length !== 0) {
      this.removeSyllabus(0);
    }

    course.syllabus.forEach(syllabusItem => {
      this.addSyllabus();
    });

    course.syllabus.forEach((syllabusItem, index) => {
      this.syllabusControls.at(index).setValue(syllabusItem);
    });
  }

  private initForm(): void {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      lessonCount: ['', [Validators.required, Validators.min(3), Validators.pattern(/^[1-9]\d*$/)]],
      startDate: ['', Validators.required],
      syllabus: this.formBuilder.array([]),
      learningMode: ['', Validators.required],
      lecturerId: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      return;
    }

    const lastSyllabusIndex = this.syllabusControls.length - 1;
    const lastSyllabusValue = this.syllabusControls.at(lastSyllabusIndex).value;
    if (lastSyllabusValue.trim() === '') {
      this.removeSyllabus(lastSyllabusIndex);
    }

    const formData = this.courseForm.value;
    formData.learningMode = parseInt(formData.learningMode);
    const newCourse = new Course(
      formData.name,
      formData.categoryId,
      formData.lessonCount,
      new Date(formData.startDate),
      formData.syllabus,
      formData.learningMode as LearningMode,
      formData.lecturerId,
      formData.image
    );

    if (this.course) {
      this.courseService.updateCourse(newCourse, this.courseId).subscribe(() => {
        this.router.navigate(['/courseDetails', this.courseId]);
      })
    }
    else {
      this.courseService.addCourse(newCourse).subscribe(() => {
        this.router.navigate(['/allCourses']);
      });
    }
  }


  get syllabusControls() {
    return this.courseForm.get('syllabus') as FormArray;
  }

  addSyllabus(): void {
    this.syllabusControls.push(this.formBuilder.control(''));
  }

  removeSyllabus(index: number): void {
    this.syllabusControls.removeAt(index);
  }


  onInputChange(): void {
    const lastSyllabusIndex = this.syllabusControls.length - 1;
    const lastSyllabus = this.syllabusControls.at(lastSyllabusIndex).value;

    if (lastSyllabus.trim() !== '') {
      this.addSyllabus();
    }

    if (lastSyllabus.trim() === '' && this.syllabusControls.length > 1) {
      this.removeSyllabus(lastSyllabusIndex);
    }
}



}
