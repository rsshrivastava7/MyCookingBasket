import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { DataStgService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private dataStgService: DataStgService) {}
  ngOnInit(){
    this.dataStgService.getRecipes();
  }

  saveData() {
    this.dataStgService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  fetchData() {
    this.dataStgService.getRecipes();
  }
}
