import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostDt } from './postmodels';

@Component({
  selector: 'app-post-details',
  templateUrl: './postDetails.component.html',
  styleUrls: ['./postDetails.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  userId!: number;
  postId!: number;
  post: PostDt = {} as PostDt; // Use the Post interface

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = +params['userId'];
      this.postId = +params['postId'];

      // Fetch post data
      this.http.get<PostDt>(`/api/posts/${this.postId}`).subscribe((data) => {
        this.post = data;
      });
    });
  }
}
