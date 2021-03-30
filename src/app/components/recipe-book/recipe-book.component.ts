import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models';
import { RecipeService } from '../../services/recipe.service';
@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.scss'],
  providers: [RecipeService]
})
export class RecipeBookComponent implements OnInit {
  recipe: Recipe; 

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((r: Recipe) => this.recipe = r);
  }
}
