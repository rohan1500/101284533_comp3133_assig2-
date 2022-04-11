import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/network/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private LoginPost = gql`
  mutation Mutation(
    $username: String!,
    $password: String!
    ) {
      login(
        username: $username,
        password: $password
      )
    }
`
loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private apollo: Apollo, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    let tempUsername = this.loginForm.get('username')?.value;
    let tempPassword = this.loginForm.get('password')?.value;

    console.log(tempUsername, tempPassword);

    this.apollo.mutate({
      mutation: this.LoginPost,
      variables: {
        username: tempUsername,
        password: tempPassword
      }
    }).subscribe((res: any) => {
      if (res.data.login === null || res.data.login === undefined) {
        alert(new Error('Please check Username and Password !'));
      } else {
        this.authService.setUserData(res.data.login[0], res.data.login[5]);
        this.router.navigate(['']);
      }
    }, (err) => {
      alert(err.message);
    })


  }


}