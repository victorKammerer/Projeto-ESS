import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../../../backend/src/models/post.model';
import { Observable } from 'rxjs';
import { initial } from 'cypress/types/lodash';

@Component({
  selector: 'app-historic-list',
  templateUrl: './historic-list.component.html',
  styleUrls: ['./historic-list.component.scss']
})

export class HistoricListComponent implements OnInit {
  // private url = 'http://localhost:5001/api';
  show_posts: Post[] = [];
  all_posts: Post[] = [];
  userId: number = 0;
  isDesc: boolean = true;
  selectedCategory: string = 'all';

  availableCategories: string[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.getHistoric();
    });
  }

  getHistoric() {
    const url = `/users/${this.userId}/historic`;

    const urlWithOrder = this.isDesc ? `${url}?desc=true` : url;

    this.http.get<Post[]>(urlWithOrder).subscribe(posts => {
      this.all_posts = posts;
      this.show_posts = [...this.all_posts];
      this.availableCategories = this.collectCategories(posts);
    });
  }

  toggleHistoricOrder() {
    this.isDesc = !this.isDesc;
    this.getHistoric();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.show_posts = [...this.all_posts];
    } else {
      const filteredPosts = this.all_posts.filter(post => post.category.includes(category));
      this.show_posts = filteredPosts;
    }
  }

  collectCategories(posts: Post[]): string[] {
    const _categories: string[] = [];

    for (const post of posts) {
      for (const category of post.category) {
        if (!_categories.includes(category)) {
          _categories.push(category);
        }
      }
    }

    return _categories;
  }

  removeCategoryFilter() {
    this.selectedCategory = 'all';
    this.show_posts = [...this.all_posts];
  }
}
