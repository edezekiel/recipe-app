import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../models';
import { ShoppingListService } from '../../services/shopping-list.service';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  ingredientAdded: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient(f: NgForm) {
    const { nameInput, amountInput } = f.form.value;
    this.shoppingListService.addIngredient(
      new Ingredient(nameInput, amountInput)
    );
  }
}
