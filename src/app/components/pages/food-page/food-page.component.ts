import { Food } from './../../../shared/models/Food';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food
  constructor(private router: ActivatedRoute, private service: FoodService) { }

  ngOnInit(): void {
    this.router.params.subscribe((param) => {
      if (param["id"]) {
        this.food = this.service.getFoodById(param["id"])
      }
    })
  }

}
