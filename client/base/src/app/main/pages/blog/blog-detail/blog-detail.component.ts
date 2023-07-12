import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentServiceService } from './../../../services/comment-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlogClientService } from 'src/app/main/services/blogClient.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit{
  formComment!: FormGroup;
  first: number = 0;
  rows: number = 10;
  blogId: Number;
  blog: any;
  comments: any;

  onPageChange(event: PageEvent) {
      this.first = event.first;
      this.rows = event.rows;
  }

  constructor(
    private route: ActivatedRoute,
    private BlogClientService: BlogClientService,
    private CommentService: CommentServiceService,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }
  private subscription = new Subscription();

  ngOnInit() {
    this.getBlog();
    this.getComment();
    this.formBuilderComment();
  }


  getBlog() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.BlogClientService.findOne(slug).subscribe({

        next: (res) => {
          console.log(res.data);
          this.formComment.controls['blog_id'].setValue(res.data.id);
          this.blog = res.data;
        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });;
    });
  }



  private formBuilderComment(){
    this.formComment = this.fb.group({
      content: [null, Validators.required],
      blog_id: this.blogId,
    })
  }


  addComment() {
    debugger
    if(this.formComment.valid){
      let create = this.CommentService.createComment(this.formComment.value);
      // let update = this.regionService.updateRegion(this.region.id, this.formRegion.value);
      create.subscribe({
        next: (res) => {
          console.log('Oke đã thêm comment:', res);
          location.reload();
        },
        error: (err) => {
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }
      })
    }
  }


  getComment() {
    let obs = this.CommentService.getComments().subscribe({
      next: (res) => {
        console.log(res.data);

        this.comments = res.data;
        console.log(res)
      },
      error: (err) => {{
        console.log('Đã xảy ra lỗi khi gọi API:', err);
      }}
    })
    this.subscription.add(obs);
  }

}
