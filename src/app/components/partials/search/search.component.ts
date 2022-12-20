import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm = ""
  constructor(private router: ActivatedRoute, private route: Router) {
    router.params.subscribe((params) => {
      if (params["searchTerm"]) {
        this.searchTerm = params["searchTerm"]
      }
    })
  }

  ngOnInit(): void {
  }
  search(term: string) {
    if (term) this.route.navigateByUrl("/search/" + term)
  }
}
