import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(i: Ingredient) {
    this.ingredients.push(i);
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(i: Ingredient[]) {
    this.ingredients.push(...i);
    this.ingredientsChanged.next(this.ingredients);
  }

  getIngredient(i: number) {
    return this.ingredients[i];
  }

  updateIngredient(i: number, newIngredient: Ingredient) {
    this.ingredients[i] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(i: number) {
    this.ingredients.splice(i, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
