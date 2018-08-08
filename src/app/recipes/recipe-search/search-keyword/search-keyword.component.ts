import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {RecipeService} from '../../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search-keyword',
  templateUrl: './search-keyword.component.html',
  styleUrls: ['./search-keyword.component.scss']
})
export class SearchKeywordComponent implements OnInit {
  keyword: string = '';
  subscription = new Subscription();

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  }

  onChange() {
    this.recipeService.search(this.keyword);
    if (this.keyword) {
      // Display keyword search result
      this.router.navigate([], {relativeTo: this.route, queryParams: {keyword: this.keyword}});
    }
  }

  onSort(field: string) {
    this.recipeService.sort(field);
  }

}
