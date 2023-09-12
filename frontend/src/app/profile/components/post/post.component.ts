import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../../../../backend/src/models/post.model';
import { User } from '../../../../../../backend/src/models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {
  userId : number = 0;
  post : Post = {} as Post;
  postId : number = 0;
  formErrors: { category: string, 
    game: string, 
    rate: string, 
    title: string,
    description: string } = {  category: '', game: '', rate: '', title: '', description: '' };
  userLoggedInId: number = 0;
  isUserLoggedIn: boolean = false;
  saved : boolean = false;
  notSaved: boolean = false;
  disabled = false;
  goToPost : boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  submitForm() {
    // Lógica para enviar o formulário se não houver erros
    if (this.isFormValid()) {
      this.sendRequest();
    }else{
      console.log('ERROR: Could not create user');
    }
  }
  
  isFormValid(): boolean{
    // Limpa mensagens de erro antes de realizar a validação
    this.formErrors = {  category: '', game: '', rate: '', title: '', description: ''};
    let isValid : boolean = true;

    // Validação do campo Nome de Usuário (obrigatório)
    if (!this.post.category) {
      this.formErrors['category'] = 'Defina a categoria do seu jogo.';
      isValid = false;
    }

    // Validação do campo E-mail (obrigatório)
    if (!this.post.game) {
      this.formErrors['game'] = 'Sobre qual jogo é sua review?.';
      isValid = false;
    }

    // Validação do campo Senha (obrigatório)
    if (!this.post.rate) {
      this.formErrors['rate'] = 'Dê uma avaliação ao jogo.';
      isValid = false;
    }

    // Validação do campo Nome e Sobrenome (obrigatório)
    if (!this.post.title) {
      this.formErrors['title'] = 'Dê um título ao seu post.';
      isValid = false;
    }

    if (!this.post.description) {
      this.formErrors['description'] = 'Escreva uma descrição para seu post.';
      isValid = false;
    }

    return isValid;
  }

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }


  saveChanges() {
    console.log(this.post);
    this.http.put(`/users/${this.userId}/${this.postId}`,this.post).subscribe(
      (response) => {
        console.log('Post made successfully');
        //this.router.navigate(['/users/', this.userId]);
        this.saved = true;
        this.disabled = true;
      },
      (error) => {
        this.notSaved = true;
        console.error('Error making your post', error);
        this.router.navigate([`/users/${this.userId}/post`]);
      }
    ); 
  }

  sendRequest(): void {
    console.log('New Post:', this.post);
    this.http.post('/post', this.post).subscribe(
      (data) => {
        const createdPost: Post = data as Post;
        console.log('createdPost:', createdPost);
        this.http.put('/post', { id: createdPost.post_id }).subscribe(
          (data) => {
            this.router.navigate([`/users/${createdPost.user_id}/${createdPost.post_id}`]);
          },
          (error) => {
            console.log("Error logging in", error);
          }
        );
      },
      (error) => {
        console.log(error.status);
        console.log(error.message);
  
        if (error.status === 409) {
          if (error.error && error.error.message) {
            const errorMessage = error.error.message;
          }
        }
      }
    );
  }  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId =+ params['id']; // O '+' converte a string para um número
    });

    this.checkIsUserLoggedIn();

    this.getPostDetails(this.userId, this.postId).subscribe(
      (data) => {
        this.post = data as Post;
        console.log(this.post.category);
      },
      (error) => {
        console.error('Error loading post details', error);
        this.router.navigate(['/not-found']);
      }
    );
  }

  getPostDetails(userId: number, postId: number) {
    return this.http.get(`/users/${userId}/${postId}`).pipe(
      catchError((error) => {
        throw error;
      })
    );
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
  
}
 