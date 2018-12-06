import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';


import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { DataStgService } from '../shared/data-storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService,private dataStgService: DataStgService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
  //  this.dataStgService.getShoppingList();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );

    this.dataStgService.storeShoppingList()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

/*   ngOnDestroy() {
    this.subscription.unsubscribe();
  } */
}
