import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs";
import { UserService } from './UserService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-form',
  templateUrl: 'my-form.component.html'
})
export class MyFormComponent {
  private user = { username: '', email: '', post: '' };
  myForm: FormGroup;
  constructor(private builder: FormBuilder, private userService: UserService, private router: Router) {
    this.myForm = this.builder.group({
      'username': [this.user.username, [Validators.required]],
      'email': [this.user.email, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      'post': [this.user.post, [Validators.required, Validators.minLength(10)]]
    });

    this.myForm.valueChanges.subscribe(
      (data: any) => this.user = data
    );
  }

  onSubmit() {
    console.log(this.user);
    this.router.navigateByUrl('done');
  }

  getData() {
    this.userService.getUser().subscribe(res => {
      this.user.username = res['username'];
      this.user.email = res['email'];
      this.userService.getPosts().subscribe(res => {
        this.user.post = res[0]['body'];
        this.myForm.setValue(this.user);
      }, null, null);
    },
      null, null);
  }

}
