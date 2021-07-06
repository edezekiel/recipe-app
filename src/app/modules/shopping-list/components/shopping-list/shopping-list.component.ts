import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription = new Subscription();

  constructor(private shoppingListService: ShoppingListService) { 
    this.subscription = shoppingListService.ingredientsChanged.subscribe((i : Ingredient[]) => {
      this.ingredients = i;
    });
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  onEditItem(i: number) {
    this.shoppingListService.startedEditing.next(i);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
