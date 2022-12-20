import { ActivatedRoute } from '@angular/router';
import { FoodService } from './../../../services/food.service';
import { Food } from './../../../shared/models/Food';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: Food[] = []
  constructor(private service: FoodService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllFoods()
    this.router.params.subscribe((params) => {
      if (params["searchTerm"]) {
        this.foods = this.service.getAllFoodsBySearchTerm(params["searchTerm"])
      }
      else if (params["tag"]) this.foods = this.service.getAllFoodByTag(params["tag"])
      else this.getAllFoods()
    })
  }
  getAllFoods(): void {
    this.foods = this.service.getAll()
  }
}
