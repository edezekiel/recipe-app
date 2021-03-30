import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { 
    shoppingListService.ingredientsChanged.subscribe((i : Ingredient[]) => {
      this.ingredients = i;
    });
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
