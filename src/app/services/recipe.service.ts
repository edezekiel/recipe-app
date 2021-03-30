import { EventEmitter } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/index';
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Garlic Herb Focaccia', 'Savory italian-style bread','http://myimperfectkitchen.com/wp-content/uploads/2013/04/0034_foccaia_myimpkitch.jpg', [
      new Ingredient('garlic', 2)
    ]),
    new Recipe('Cheese Herb Focaccia', 'Savory italian-style bread','http://myimperfectkitchen.com/wp-content/uploads/2013/04/0034_foccaia_myimpkitch.jpg', [
      new Ingredient('shredded cheddar', 3),
      new Ingredient('herbs', 10)
    ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  constructor() { }
}
