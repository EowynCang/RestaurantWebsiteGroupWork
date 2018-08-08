import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public imagePath: string;
  public description: string;
  public calorie: number;
  public user: string;
  public ingredients: Ingredient[];

  constructor(
    name: string, 
    imagePath: string, 
    desc: string, 
    calorie: number, 
    user: string, 
    ingredients: Ingredient[]) {
    this.name = name;
    this.imagePath = imagePath;
    this.description = desc;
    this.calorie = calorie;
    this.user = user;
    this.ingredients = ingredients;
  }

  searchIngredient(keyword: string): boolean {
    for (let ingredient of this.ingredients) {
      if (ingredient["name"].toLowerCase().indexOf(keyword) >= 0) {
        return true;
      }
    }
    return false;
  }
}
