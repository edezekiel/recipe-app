import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from 'src/app/models';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from '../../services/shopping-list.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((p: Params ) => this.recipe = this.recipeService.getRecipe(+p.id));
  }

  addToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
