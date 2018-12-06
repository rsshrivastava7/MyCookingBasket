import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';


@Injectable()
export class DataStgService {
  constructor(private http: Http, private recipeService: RecipeService,private ingredientsService: ShoppingListService) {}

  storeRecipes() {
    return this.http.put('https://recipe-book-7348f.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }
  deleteRecipes(index:number) {
    return this.http.delete('https://recipe-book-7348f.firebaseio.com/recipes' + '/' +index + '.json')
  }

  getRecipes() {
    this.http.get('https://recipe-book-7348f.firebaseio.com/recipes.json')
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

  storeShoppingList() {
    return this.http.put('https://recipe-book-7348f.firebaseio.com/shoppingList.json', this.ingredientsService.getIngredients());
  }

  getShoppingList() {
    this.http.get('https://recipe-book-7348f.firebaseio.com/shoppingList.json')
      .map(
        (response: Response) => {
          const list: Ingredient[] = response.json();
          for (let item of list) {
            if (!item['ingredients']) {
              item['ingredients'] = [];
            }
          }
          return list;
        }
      )
      .subscribe(
        (list: Ingredient[]) => {
          this.ingredientsService.setIngredient(list);
        }
      );
  }
}
