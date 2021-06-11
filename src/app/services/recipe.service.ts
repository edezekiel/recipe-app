import { Recipe } from '../models/recipe.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, tap, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  FIREBASE_URL = 'https://ng-complete-guide-15ad4-default-rtdb.firebaseio.com/';
  RECIPES_URL = `${this.FIREBASE_URL}recipes.json`;

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe('Garlic Herb Focaccia', 'Savory italian-style bread','http://myimperfectkitchen.com/wp-content/uploads/2013/04/0034_foccaia_myimpkitch.jpg', [
  //     new Ingredient('garlic', 2)
  //   ]),
  //   new Recipe('Cheese Herb Focaccia', 'Savory italian-style bread','http://myimperfectkitchen.com/wp-content/uploads/2013/04/0034_foccaia_myimpkitch.jpg', [
  //     new Ingredient('shredded cheddar', 3),
  //     new Ingredient('herbs', 10)
  //   ])
  // ];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(r: Recipe) {
    this.recipes.push(r);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(i: number, r: Recipe) {
    this.recipes[i] = r;
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(i: number) {
    this.recipes.splice(i, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  /* HTTP Methods */
  storeRecipes() {
    this.http.put(this.RECIPES_URL, this.recipes)
      .subscribe(data => console.log(data));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.RECIPES_URL).pipe(
      map(recipes => this._setRecipeIngredients(recipes)),
      tap(recipes => this._setRecipes(recipes)))
  }

  /* Helper Methods */
  private _setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  private _setRecipeIngredients(recipes: Recipe[]): Recipe[] {
    return recipes.map(recipe => {
      return { 
        ...recipe,
        ingredients: recipe.ingredients ? recipe.ingredients : []
      }
    });
  }
}
