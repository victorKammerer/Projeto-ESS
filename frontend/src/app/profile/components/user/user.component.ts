import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../../backend/src/models/user.model';
import { Post } from '../../../../../../backend/src/models/post.model';
import { catchError } from 'rxjs/operators';
import imageUtils from "../../../../assets/getImages.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  userId : number = 0;
  postId : number = 0;
  user : User = {} as User;
  post : Post = {} as Post;
  userLoggedInId: number = 0;
  isUserLoggedIn: boolean = false;
  followers : User[] = [];
  following : User[] = [];
  followersCount: number = 0;
  followingCount: number = 0;
  isFollowing: boolean = false;
  followPopUp: boolean = false;
  activeTab: string = 'followers';
  goToEdit: boolean = true;
  goToPost: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.userId =+ params['id']; // O '+' converte a string para um número
      this.postId =+ params['id'];
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

  _getProfileImage() {
    const prefix = '../../../../'
    return imageUtils.getProfileImage(prefix, this.userId);
  }
  
  _getBackgroundImage() {
    const prefix = '../../../../'
    return imageUtils.getBackgroundImage(prefix, this.userId);
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

  closePopUp() {
    this.followPopUp = false;
  }

  followerButton(): void {
    if(this.followPopUp == true)
      this.followPopUp = false;
    else
      this.followPopUp = true;
    
    this.activeTab = 'followers';
  }

  followingButton(): void {
    if(this.followPopUp == true)
      this.followPopUp = false;
    else
      this.followPopUp = true;


    this.activeTab = 'following';
  }

  updateFollowersCount(count: number) {
    this.followersCount = count;
  }

  updateFollowingCount(count: number) {
    this.followingCount = count;
  }

  updateFollowersList(followers: User[]) {
    this.followers = followers;
  }

  updateFollowingList(following: User[]) {
    this.following = following;
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

  navigateToUserLoggedIn(){
    this.http.get('/me').subscribe(data => {
      const userLoggedIn = data as User;
      this.userLoggedInId = userLoggedIn.id;

      this.router.navigate(['/users/' + this.userLoggedInId]);
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
  
  public editButton(): void {
    if (this.goToEdit) {
      this.router.navigate([`/users/${this.userId}/edit`]);
      this.goToEdit = false;
    } else {
      this.router.navigate([`/users/${this.userId}`]);
      this.goToEdit = true;
    }
  }

  public postButton(): void {
    if (this.goToPost) {
      this.router.navigate([`/users/${this.userId}/post`]);
      this.goToPost = false;
    } else {
      this.router.navigate([`/users/${this.userId}`]);
      this.goToPost = true;
    }
  }

  public goToRoute(route: string) {
    let route_ = '/users/' + this.userId + '/' + route;
    this.router.navigate([route_]);
  }

}
 