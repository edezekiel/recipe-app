import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RecipeService } from 'src/app/modules/recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;

  private userSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.recipeService.storeRecipes();
  }

  onFetchData() {
    this.recipeService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
