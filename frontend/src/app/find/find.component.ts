import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../backend/src/models/user.model';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent {
  query: string = '';
  users: User[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

onSearch() {
  console.log(this.query);
  if (this.query.length > 2 && this.query.length < 30) {
    this.http.get<any[]>(`/search/users/${this.query}`).subscribe(
      data => {
        this.users = data;
        },
      error => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
    } else {
      this.users = [];
    }
  }

  onUserClick(userId: number) {
    this.router.navigate([`/users/${userId}`]);
  }

}

