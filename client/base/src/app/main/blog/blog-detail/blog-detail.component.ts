import { BlogsService } from './../../../module/_mShared/service/blogs.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogClientService } from 'src/app/services/blogClient.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private BlogClientService: BlogClientService,
    private BlogsService: BlogsService,

  ) { }

  blog: any

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.BlogsService.findOne(slug).subscribe({

        next: (res) => {
          console.log(res.data);

          this.blog = res.data;
        },
        error: (err) => {{
          console.log('Đã xảy ra lỗi khi gọi API:', err);
        }}
      });;
    });
  }

}
