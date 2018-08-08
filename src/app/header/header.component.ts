import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as $ from 'jquery';
import { RecipeService } from '../recipes/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() submit = new EventEmitter<any>();

  keyword:string;
  username: string;
  password: string;
  userList: any[] = [];
  isTrueUser = true;
  isTruePassword = true;
  types = ['Male', 'Female'];
  userStatus: boolean = false;

  constructor(private userService: UserService, private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.userStatus.subscribe(
      (userStatus: boolean) => {
        this.userStatus = userStatus;
      }
    )
  }

  insertUser() {

    // Sign up and send to db
    $.ajax({
      url: 'http://localhost:1337/signup',
      data: {'username': this.username, 'password': this.password},
      type: 'POST',
      dataType: 'json',
      async: true,
      timeout: 5000,
      complete: function () {
        console.log('end');
      },
      success: function (data, textStatus, jqXHR) {
        console.log(data);
        console.log(textStatus);
        console.log(jqXHR);
      },
      error: function (textStatus, jqXHR) {
        console.log('error');
        console.log(textStatus);
        console.log(jqXHR);
      }
    });
  }

  onSearch() {
    this.recipeService.search(this.keyword);
    this.keyword = '';
    this.router.navigate(['search'], {relativeTo: this.route});
  }

  onLogout() {
    this.userService.setUserLoggedOut();
    this.router.navigate(['/']);
  }

}
