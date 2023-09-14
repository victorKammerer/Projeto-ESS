import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../../../../../backend/src/models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './postDetails.component.html',
  styleUrls: ['./postDetails.component.scss'],
})

export class PostDetailComponent implements OnInit {
  postId!: number;
  post: Post = {} as Post;
  postDate! : Date;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('post_id'));
    this.route.params.subscribe((params) => {
      this.postId = +params['postId'];
    }
  );}
}