import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { UserService } from '../user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {
  user: string = "";
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
  ];

  // Get shoppinglist from db
  fetchFromServer() {
    this.ingredients = [];
    this.ingredientsChanged.next(this.ingredients);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:1337/getsl', true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {

        let resString = xhr.responseText;
        console.log(resString);

        let slData = JSON.parse(resString);
        for (let i = 0; i < slData.length; i++) {
          if (this.userService.username === slData[i]['user']) {
            let size = Object.keys(slData[i]).length;
            let ingredients: Ingredient[] = [];
            for (let j = 0; j < size - 2; j += 2) {
              console.log(slData[i]['ing'+j]);
              console.log(slData[i]['amt'+j]);
              ingredients.push(new Ingredient(slData[i]['ing'+j], slData[i]['amt'+j]));
              this.ingredients = ingredients;
              return;
            }
          }
        }
      }
    };
    xhr.send(null);
  }

  putToServer() {
    $.ajax({
      url: 'http://localhost:1337/putsl',
      data: {
        'user': this.userService.username,
        'ingredients': this.ingredients},
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

  constructor(private userService: UserService) {
    this.fetchFromServer();

    // this.ingredients = this.getRecipes().slice();
    // this.ingredientsChanged.next(this.ingredients);
  }



  getIngredients() {
    return this.ingredients;
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    // this.ingredients.push(ingredient);
    for (let i of this.ingredients) {
      if (i.name === ingredient.name) {
        i.amount += ingredient.amount;
        this.ingredientsChanged.next(this.ingredients);
        return;
      }
    }
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);

  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      this.addIngredient(ingredient);
    }
    // this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients);
  }
}
