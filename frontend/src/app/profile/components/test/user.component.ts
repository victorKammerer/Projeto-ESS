import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../../backend/src/models/user.model';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  userId : number = 0;
  user : User = {} as User;
  userLoggedInId: number = 0;
  followersCount: number = 0;
  blockedCount: number = 0;
  followingCount: number = 0;
  isUserLoggedIn: boolean = false;
  isFollowing: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId =+ params['id']; // O '+' converte a string para um número
    });

    this.checkIsUserLoggedIn();

    this.getUserDetails(this.userId).subscribe(
      (data) => {
        this.user = data as User;
        console.log(this.user.name);
      },
      (error) => {
        console.error('Error loading user details', error);
        this.router.navigate(['/not-found']);
      }
    );

    this.checkIsFollowing();
  }

  getUserDetails(userId: number) {
    return this.http.get(`/users/${userId}`).pipe(
      catchError((error) => {
        throw error;
      })
    );
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

  followUser() {
    const endpoint = '/users/' + this.userId + '/follow';
    this.http.post(endpoint, {id : this.userLoggedInId}).subscribe(data => {
      console.log(data);
      this.isFollowing = true;
      this.followersCount++;
    });
  }

  unfollowUser() {
    const endpoint = '/users/' + this.userId + '/unfollow';
    this.http.post(endpoint, {id : this.userLoggedInId}).subscribe(data => {
      console.log(data);
      this.isFollowing = false;
      this.followersCount--;
    });
  } 


  checkIsUserLoggedIn() {
    this.http.get('/me').subscribe(data => {
      const userLoggedIn = data as User;
      this.userLoggedInId = userLoggedIn.id;

      if (userLoggedIn.id === this.userId) {
        this.isUserLoggedIn = true;
      }

    });

  }

  checkIsFollowing() {
    const followers = this.http.get(`/users/${this.userId}/followers`);

    followers.subscribe(data => {
      const followersList = data as User[];
      const userLoggedIn = followersList.find(user => user.id === this.userLoggedInId);

      if (userLoggedIn) {
        this.isFollowing = true;
      }
    }); 
  }

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }

  public goToHistoric(): void {
    this.router.navigate([`/users/${this.userId}/historic`]);
  }

}