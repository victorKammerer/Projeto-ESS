import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../../backend/src/models/user.model';
import { FollowersComponent } from '../../../followers/followers.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  userId : number = 0;
  user : User = {} as User;
  followersCount: number = 0;
  followingCount: number = 0;
  blockedCount: number = 0;
  isUserLoggedIn: boolean = false;
  isFollowing: boolean = false;
  isBlocked: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId =+ params['id']; // O '+' converte a string para um número
    });

    this.checkIsUserLoggedIn();

    this.getUserDetails(this.userId).subscribe(data => {
      this.user = data as User;

      if(!this.user) {
        this.router.navigate(['/not-found']);
      }
    });

  }

  getUserDetails(userId: number) {
      const data = this.http.get(`/users/${userId}`);
      console.log(data);
      return data
  }

  public createItem(): void {
    // Implementação do método createItem
  }

  public followersButton(): void {
    // Agora, quando este método for chamado, this.userId já terá um valor definido
    this.router.navigate([`/users/${this.userId}/followers`]);
  }

  public followingButton(): void {
    this.router.navigate([`/users/${this.userId}/following`]);
  }

  updateFollowersCount(count: number) {
    this.followersCount = count;
  }
  
  updateFollowingCount(count: number) {
    this.followingCount = count;
  }
  
  updateBlockedCount(count: number) {
    this.blockedCount = count;
  }

  checkIsUserLoggedIn() {
    this.http.get('/me').subscribe(data => {
      const userLoggedIn = data as User;

      if (userLoggedIn.id === this.userId) {
        this.isUserLoggedIn = true;
      }

    });

  }

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }

}