
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Lecturer } from '../lecturer.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  users: User[] = []
  lecturers: Lecturer[] = []
  isLecturer: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  login(): void {
    
    var user: User|undefined;
    var lecturer: Lecturer|undefined;
    if (!this.isLecturer) {
       user = this.users.find(x => x.name.toLowerCase() == this.username.toLowerCase());
       if (user && user.password==this.password) {
        Swal.fire('Success', 'Login successful! Redirecting to courses page...', 'success');
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/allCourses']);
      }
      else if (user) {
        Swal.fire('Error', 'Incorrect password. Please try again.', 'error');
      }
      else {
        Swal.fire('Error', 'User does not exist. Redirecting to registration...', 'error');
        this.router.navigate(['/register'], { queryParams: { username: this.username } });
      }
    }
     else {
       lecturer = this.lecturers.find(x => x.name.toLowerCase() == this.username.toLowerCase());
       if (lecturer && lecturer.password==this.password) {
        Swal.fire('Success', 'Login successful! Redirecting to courses page...', 'success');
        sessionStorage.setItem('currentLecturer', JSON.stringify(lecturer));
        this.router.navigate(['/allCourses']);
      }
      else if (lecturer) {
        Swal.fire('Error', 'Incorrect password. Please try again.', 'error');
      }
      else {
        Swal.fire('Error', 'Lecturer does not exist. Redirecting to registration...', 'error');
      }
    }

   
  }



  ngOnInit(): void {

    this.userService.getUser().subscribe(data => {
      this.users = data;
    })

    this.userService.getLecturer().subscribe(data => {
      this.lecturers = data;
    })

  }

}
