import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from 'src/app/module/_mShared/service/blogs.service';
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

  slug: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.slug = +params['id'];
      this.getBlogDetail();
    });
  }

  getBlogDetail() {

  }

}
