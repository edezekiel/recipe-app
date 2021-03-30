import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models';
import { ShoppingListService } from '../../services/shopping-list.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addToShoppingList() {
    for (let i of this.recipe.ingredients) {
      this.shoppingListService.addIngredient(i);
    }
  }
}
