import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  favorite: Recipe[] = this.recipeService.favorite;
  loginStatus: boolean = false;
  user: string;

  constructor(private userService: UserService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.loginStatus = this.userService.getUserLoggedIn();
    this.userService.userStatus.subscribe(
      (userStatus: boolean) => {
        this.loginStatus = userStatus;
      }
    )
    this.recipeService.favoriteChanged.subscribe(
      (favorite: Recipe[]) => {
        this.favorite = favorite;
      }
    )
    this.user = this.userService.username;
    console.log(this.loginStatus);
  }

}
