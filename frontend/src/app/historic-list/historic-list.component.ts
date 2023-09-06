import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  show_posts: Post[] = [];
  all_posts: Post[] = [];
  userId: number = 0;
  isDesc: boolean = false;
  selectedCategory: string = 'all';
  availableCategories: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.getHistoric();
    });
  }

  // Ordem do histórico (historico total ou filtrado)
  toggleHistoricOrder() {
    this.isDesc = !this.isDesc;
    if (this.selectedCategory === 'all') {
      this.getHistoric();
    } else {
      this.getHistoricByCategory(this.selectedCategory);
    }
  }

  // Obter todos os posts do usuário
  getHistoric() {
    const url = `/users/${this.userId}/historic`;
    const urlWithOrder = this.isDesc ? `${url}?desc=true` : url;

    this.http.get<Post[]>(urlWithOrder).subscribe(posts => {
      this.all_posts = posts;
      this.show_posts = [...this.all_posts];
      this.availableCategories = this.collectCategories(posts);
      //ordenando as categorias
      this.availableCategories.sort();
    });
  }

  // Obter posts do usuário filtrados por categoria
  getHistoricByCategory(category: string) {
    const url_category = `/users/${this.userId}/historic/category/${category}`;
    const urlWithOrder_category = this.isDesc ? `${url_category}?desc=true` : url_category;
    this.selectedCategory = category;
    
    this.http.get<Post[]>(urlWithOrder_category).subscribe(filteredPosts => {
      this.show_posts = filteredPosts;
    });
  }
  
  // Obter todas as categorias dos posts do usuário
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

  // Remover filtro de categoria
  removeCategoryFilter() {
    this.selectedCategory = 'all';
    this.show_posts = [...this.all_posts];
  }

  // Ir para outras rotas
  public goToRoute(route: string) {
    this.router.navigate([route]);
  }
}
