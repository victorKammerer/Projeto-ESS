import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../../backend/src/models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
  userId : number = 0;
  userLoggedInId: number = 0;
  user : User = {} as User;
  saved : boolean = false;
  notSaved: boolean = false;
  disabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient  
  ) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.userId =+ params['id']; // O '+' converte a string para um número
    });

    //geting loggedID and returning if the user is not logged with the correct id
    this.http.get('/me').subscribe(data => {
      const userLoggedIn = data as User;
      this.userLoggedInId = userLoggedIn.id;   
      
      if(this.userLoggedInId !== this.userId){     
        this.router.navigate([`/users/${this.userId}`]);
      }
    });  

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
  }

  getUserDetails(userId: number) {
    const params = new HttpParams().set('loggedID', this.userLoggedInId);

    return this.http.get(`/users/${userId}`,{params}).pipe(
      catchError((error) => {
        console.error('Error loading user details', error);
        return throwError(error);
      })
    );
  }

  saveChanges() {
    console.log(this.user);
    this.http.put(`/users/${this.userId}`,this.user).subscribe(
      (response) => {
        console.log('User details updated successfully');
        //this.router.navigate(['/users/', this.userId]);
        this.saved = true;
        this.disabled = true;
        window.location.reload();
      },
      (error) => {
        this.notSaved = true;
        console.error('Error updating user details', error);
        this.router.navigate([`/users/${this.userId}/edit`]);
      }
    ); 
  }
}

