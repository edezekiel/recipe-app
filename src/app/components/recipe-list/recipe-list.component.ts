import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Garlic Herb Focaccia', 'Savory italian-style bread','http://myimperfectkitchen.com/wp-content/uploads/2013/04/0034_foccaia_myimpkitch.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
