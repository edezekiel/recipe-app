import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../models';
import { ShoppingListService } from '../../services/shopping-list.service';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("f", { static: false} ) slForm: NgForm;
  ingredientAdded: Ingredient;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((i: number) => { 
        this.editedItemIndex = i;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(i);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
    });
  }

  addIngredient(f: NgForm) {
    const { name, amount } = f.form.value;
    this.shoppingListService.addIngredient(new Ingredient(name, amount));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
