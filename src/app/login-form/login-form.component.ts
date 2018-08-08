import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  resString = '';
  userInfomation: any;

  constructor(private router: Router, private user: UserService) {
  }

  ngOnInit() {
  }

  // loginUser1(e) {
  //   e.preventDefault();
  //   const username = e.target.elements[0].value;
  //   const password = e.target.elements[1].value;
  //   if (username === 'admin' && password === 'admin') {
  //     this.user.setUserLoggedIn();
  //     this.router.navigate(['dashboard']);
  //   }
  // }

  loginUser(e) {
    e.preventDefault();
    const username = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    // Recieve user information from db
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:1337/login', true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {

        this.resString = xhr.responseText;
        console.log(this.resString);

        this.userInfomation = JSON.parse(this.resString);
        for (let i = 0; i < this.userInfomation.length; i++) {
          if (username === this.userInfomation[i].username && password === this.userInfomation[i].password) {
            this.user.setUserLoggedIn(username);
            this.router.navigate(['dashboard']);
          }
        }
      }
    };
    xhr.send(null);
  }
}
