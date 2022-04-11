import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const ADD_USERS = gql`
  mutation register(
    $username: String!
    $password: String!
    $email: String!
    $firstname:String!
    $lastname:String!
    $type:String1
  ) {
    register(
        username: $username
        password: $password
        email: $email
        firstname:$firstname
        lastname:$lastname
        type:$type
    ) {
      email
    }
  }`
@Component({
  selector: 'register',
  templateUrl: './signup/signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private router: Router
  ) {}
  user_id = 1;
  ngOnInit(): void {}

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    npassword: ['', [Validators.required, Validators.minLength(6)]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    type: ['', [Validators.required]]

  });

  registerUser(event: any) {
    if (!this.registerForm.valid) {
      return;
    }
    event.preventDefault();
    const errors = [];
    const target = event.target;
    const user_id = this.user_id;
    this.user_id++;
    const username = target.querySelector('#username').value;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    const npassword = target.querySelector('#npassword').value;
    const firstname = target.querySelector('#firstname').value;
    const lastname = target.querySelector('#lastname').value;
    const type= target.querySelector('#type').value;
    if (password != npassword) {
      errors.push('Password do not match');
    } else {
      this.apollo
        .mutate({
          mutation: ADD_USERS,
          variables: {
            username: username,
            password: password,
            email: email,
            firstname:firstname,
            lastname:lastname,
            type:type
          },
        })
        .subscribe(() => {
          console.log('User registerd');
          this.router.navigate(['/login']);
        });
    }
  }
}