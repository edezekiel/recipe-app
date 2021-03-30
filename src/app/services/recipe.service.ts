import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

// @Injectable({
//   providedIn: 'root'
// })
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Garlic Herb Focaccia', 'Savory italian-style bread','http://myimperfectkitchen.com/wp-content/uploads/2013/04/0034_foccaia_myimpkitch.jpg'),
    new Recipe('Cheese Herb Focaccia', 'Savory italian-style bread','http://myimperfectkitchen.com/wp-content/uploads/2013/04/0034_foccaia_myimpkitch.jpg')
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  constructor() { }
}
