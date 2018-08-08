import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  searchResultChanged = new Subject<Recipe[]>();
  searchResult = <Recipe[]>[];
  keyword: string = "";
  keywordChanged = new Subject<string>();
  favorite: Recipe[] = [];
  favoriteChanged = new Subject<Recipe[]>();

  private recipes: Recipe[];

  // Get recipes from db
  fetchFromServer() {
    this.recipes = [];
    this.recipesChanged.next(this.recipes);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:1337/getrecipe', true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {

        let resString = xhr.responseText;
        console.log(resString);

        let recipesData = JSON.parse(resString);
        for (let i = 0; i < recipesData.length; i++) {
          let size = Object.keys(recipesData[i]).length;
          console.log(size);
          let ingredients: Ingredient[] = [];
          for (let j = 0; j < size - 6; j += 2) {
            console.log(recipesData[i]['ing'+j]);
            console.log(recipesData[i]['amt'+j]);
            ingredients.push(new Ingredient(recipesData[i]['ing'+j], recipesData[i]['amt'+j]));
          }

          console.log(recipesData[i]['name']);
          let recipe = new Recipe(
            recipesData[i]['name'],
            recipesData[i]['imagePath'],
            recipesData[i]['desc'],
            recipesData[i]['calorie'],
            recipesData[i]['user'],
            ingredients
          );
          this.recipes.push(recipe);
          console.log(recipe);
        }
      }
    };
    xhr.send(null);
  }

  // myobj['ing'+i] = params[Object.keys(params)[5 + i]];
  // myobj['amt'+i] = params[Object.keys(params)[5 + i + 1]];

  constructor() {
    // this.recipes = [
    //   new Recipe(
    //     'Tasty Schnitzel',
    //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //     'A super-tasty Schnitzel - just awesome!',
    //     800,
    //     'u1',
    //     [
    //       new Ingredient('Meat', 1),
    //       new Ingredient('French Fries', 20)
    //     ]),
    //   new Recipe('Big Fat Burger',
    //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //     'What else you need to say?',
    //     600,
    //     'u2',
    //     [
    //       new Ingredient('Buns', 2),
    //       new Ingredient('Meat', 1)
    //     ])
    // ];

    this.fetchFromServer();

    this.searchResult = this.getRecipes().slice();
    this.searchResultChanged.next(this.searchResult);


  }

  addFavorite(recipe: Recipe) {
    this.favorite.push(recipe);
    this.favoriteChanged.next(this.favorite);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes);
  }

  getRecipes() {
    return this.recipes;
  }

  getKeyword() {
    return this.keyword;
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }

  search(keyword: string) {
    this.searchResult = [];
    this.keyword = keyword;
    this.keywordChanged.next(this.keyword);
    // Search recipes function
    for (let recipe of this.recipes) {
      if (recipe["name"].toLocaleLowerCase().indexOf(this.keyword.toLowerCase()) >= 0 || recipe["description"].toLowerCase().indexOf(this.keyword.toLowerCase()) >= 0 || recipe.searchIngredient(this.keyword.toLowerCase())) {
        this.searchResult.push(recipe);
      }
    }
    this.searchResultChanged.next(this.searchResult);
  }

  getSearchResult() {
    return this.searchResult;
  }

  // Search by name, calorie user ...
  sort(field: string) {
    if (field === 'name') {
      this.searchResult.sort(
        (a, b) => a.name.localeCompare(b.name)
      )
      this.searchResultChanged.next(this.searchResult);
    }

    if (field === 'calorie') {
      this.searchResult.sort(
        (a, b) => a.calorie < b.calorie ? -1 : (a.calorie > b.calorie ? 1 : 0)
      )
      this.searchResultChanged.next(this.searchResult);
    }

    if (field === 'user') {
      this.searchResult.sort(
        (a, b) => a.user.localeCompare(b.user)
      )
      this.searchResultChanged.next(this.searchResult);
    }

  }
}
