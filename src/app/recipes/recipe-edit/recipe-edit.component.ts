import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';

import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      let recipe = new Recipe(
        this.recipeForm.value.name,
        this.recipeForm.value.imagePath,
        this.recipeForm.value.description,
        this.recipeForm.value.calorie,
        this.userService.username,
        this.recipeForm.value.ingredients
      );
      this.recipeService.addRecipe(recipe);
      console.log(recipe);
      this.addRecipe(recipe);
    }
    this.onCancel();
  }

  addRecipe(recipe: Recipe) {
    // Send new recipe to db
    $.ajax({
      url: 'http://localhost:1337/addrecipe',
      data: {
        'name': recipe.name,
        'imagePath': recipe.imagePath,
        'desc': recipe.description,
        'calorie': recipe.calorie,
        'user': recipe.user,
        'ingredients': recipe.ingredients
      },
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

  onAddIngredient() {
    // Add new ingredients to a recipe
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    let recipeCalorie = 0;

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      recipeCalorie = recipe.calorie;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
      'calorie': new FormControl(recipeCalorie, Validators.required)
    });
  }

}
