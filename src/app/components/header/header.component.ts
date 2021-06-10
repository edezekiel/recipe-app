import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSaveData() {
    this.recipeService.storeRecipes();
  }
}
