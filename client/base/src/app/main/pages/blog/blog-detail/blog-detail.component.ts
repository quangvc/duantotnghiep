import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentServiceService } from '../../../services/comment-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isCommentsArrayEmpty: boolean
  commentForm: any;
  note: any;

  onPageChange(event: PageEvent) {
      this.first = event.first;
      this.rows = event.rows;
  }

  constructor(
    private route: ActivatedRoute,
    private BlogClientService: BlogClientService,
    private CommentService: CommentServiceService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }
  private subscription = new Subscription();

  ngOnInit() {
    this.getBlog();
    this.formBuilderComment();
    this.checkComment();

  }


  getBlog() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.BlogClientService.findOne(slug).subscribe({

        next: (res) => {
          console.log(res.data);
          this.formComment.controls['blog_id'].setValue(res.data.id);
          this.getComment(res.data.id);
          this.blog = res.data;
          this.checkLogin();
        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });;
    });
  }

  getComment(blog_id: any) {
    let obs = this.CommentService.getCommentByBlog(blog_id).subscribe({
      next: (res) => {
        console.log(res.data);

        this.comments = res.data.map((comment: any) => ({
          ...comment,
          isReplying: false,
          replies: [] // Khởi tạo mảng chứa các câu trả lời cho mỗi bình luận
        }));

        // Lấy và lưu các câu trả lời cho mỗi bình luận
        this.comments.forEach((comment: any) => {
          this.CommentService.getReplyByComment(comment.id).subscribe({
            next: (replyRes) => {
              console.log(replyRes.data);
              comment.replies = replyRes.data;
            },
            error: (err) => {
              console.log('Đã xảy ra lỗi khi gọi API:', err);
            }
          });
        });
      },
      error: (err) => {{
        console.log('Đã xảy ra lỗi khi gọi API:', err);
      }}
    });
    this.subscription.add(obs);
  }

  getReply(cmt_id: any) {
    const cmtId = cmt_id
      this.CommentService.getReplyByComment(cmtId).subscribe({

        next: (res) => {
          console.log(res.data);
        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });;
  }


  private formBuilderComment(){
    this.formComment = this.fb.group({
      cmt_id: [null],
      content: [null, Validators.required],
      blog_id: [null, Validators.required],

    })
  }


  addComment() {
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

  addReply(cmt_id: any) {

    console.log(cmt_id);
    this.formComment.controls['cmt_id'].setValue(cmt_id);
    if(this.formComment.valid){
      let create = this.CommentService.createComment(this.formComment.value);
      create.subscribe({
        next: (res) => {
          console.log('Oke đã thêm reply:', res);
          location.reload();
        },
        error: (err) => {
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }
      })
    }
  }




  checkComment() {
    this.isCommentsArrayEmpty = this.comments.length === 0 ? false : true;
  }

  checkLogin(){
    let user:any = sessionStorage.getItem('user');
    if(user){
      this.commentForm = true;
      this.note = false;
    }else{

      this.commentForm = false;
      this.note = true;
    }
  }

}
