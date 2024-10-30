import { Component, OnInit } from '@angular/core';
import { FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public searchQuery:string = '';
  constructor(private router: Router, private searchService:SearchService) { }

  ngOnInit(): void {

  }

  onSearch() {
    this.searchService.updateSearchQuery(this.searchQuery);
    this.router.navigate(['/products']);
  }
  onReset() {
    this.searchQuery = '';
    this.searchService.updateSearchQuery('');
    this.router.navigate(['/products']);
  }

}
