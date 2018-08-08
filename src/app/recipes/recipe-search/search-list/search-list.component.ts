import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  keyword: string = "";
  keywordSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // Show recipes list
    this.subscription = this.recipeService.searchResultChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipeService.search('');
    this.keywordSubscription = this.recipeService.keywordChanged
      .subscribe(
        (keyword: string) => {
          this.keyword = keyword;
        }
      )
    this.keyword = this.recipeService.getKeyword();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.keywordSubscription.unsubscribe();
  }
}
