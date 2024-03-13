
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  userForm!: FormGroup;
  user?: User;
  users: User[] = [];
  usernameFromQueryParam: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUser().subscribe(data => {
      this.users = data;
    })

    this.route.queryParams.subscribe(params => {
      this.usernameFromQueryParam = params['username'] || '';
      this.initForm();
    });
  }

  initForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.usernameFromQueryParam, [Validators.required, Validators.minLength(3)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  register(): void {

    const userExists = this.checkIfUserExists(this.userForm.value.name);

    if (userExists) {
      Swal.fire('Error', 'User already exists. Please choose a different username.', 'error');
    }
    else {
      const user = new User(this.userForm.value.name, this.userForm.value.address, this.userForm.value.email, this.userForm.value.password)
      this.userService.postUser(user).subscribe(() => {
        Swal.fire('Success', 'Registration successful! Redirecting to courses page...', 'success');
        this.users.push(user);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/allCourses']);
        
      }, err => console.log("err", err));
    }
  }

  private checkIfUserExists(username: string): boolean {

    const user = this.users.find(x => x.name.toLowerCase() === username.toLowerCase());
    if (user)
      return true
    return false
  }
}
