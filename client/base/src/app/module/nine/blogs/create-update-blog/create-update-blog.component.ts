import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, firstValueFrom } from 'rxjs';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { BlogsService } from 'src/app/module/_mShared/service/blogs.service';
import { ImagesService } from './../../../_mShared/service/images.service';
import { Auth } from 'src/app/auth/_aShared/auth.class';
import { Regex } from 'src/app/module/_mShared/service/static/regex.class';

declare let $: any;

@Component({
  selector: 'create-update-blog',
  templateUrl: './create-update-blog.component.html',
  styleUrls: ['./create-update-blog.component.scss']
})
export class CreateUpdateBlogComponent implements OnInit, OnDestroy {
  date = null;
  private subscription = new Subscription();

  @Input() blogId: any;
  @Input() displayCreateUpdateBlog: boolean = false;
  @Output() closeModal = new EventEmitter<any>();

  title: string;
  slug: any;
  isLoading: boolean = false;

  content: string

  image: string;
  user_id: number;

  formBlog!: FormGroup;

  auth = Auth.User('user');

  constructor(
    private fb: FormBuilder,
    private blogsService: BlogsService,
    private imagesService: ImagesService,
    private message: NzMessageService,
  ) {
  }

  users: any[] = [];

  ngOnInit() {
    this.createFormBuildBlog();
    this.getValueFormUpdate();
  }

  private createFormBuildBlog(){
    this.formBlog = this.fb.group({
      user_id: [this.auth.id, Validators.required],
      title: [null, Validators.required],
      slug: [null],
      content: [null]
    })
  }

  onKeyUp(event: any) {
    this.slug = Regex.Slug(event.target.value);
    this.formBlog.get('slug')?.setValue(Regex.Slug(event.target.value));
  }

  getValueFormUpdate(){
    if(this.blogId) {
      let obs = this.blogsService.findOne(this.blogId).subscribe({
        next: (res) => {
          this.formBlog.patchValue(res.data);
          this.content = res.data.content;
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }
      })

      this.subscription.add(obs);
    }
  }

  onSelectFile(event: any) {

  }

  handleOk() {
    this.isLoading = true;
    if (this.formBlog.valid) {

      let createUpdate;

      const formData = new FormData();

      formData.append("user_id", this.formBlog.value.user_id);
      formData.append("title", this.formBlog.value.title);
      formData.append("slug", this.formBlog.value.slug);
      formData.append("content", this.content);

      let file = $('#file').prop('files');

      if(file.length > 0){
        formData.append("image", file[0]);
      }

      if(this.blogId){
        let newData = {
          ...this.formBlog.value,
        }

        if(file.length > 0){
          newData = {
            ...this.formBlog.value,
            image: {...file[0]},
          }
        }
        createUpdate = this.blogsService.updateBlog(this.blogId, formData);
      }else{
        createUpdate = this.blogsService.createBlog(formData);
      }

      createUpdate.subscribe({
        next: (res) => {
          this.isLoading = false;
          this.closeModal.emit();
          this.message.create(SUCCESS, `${res.message}`)
        },
        error: (err) => {
          this.isLoading = false;
          this.message.create(ERROR, err.error.message);
        }
      })

    }
  }

  handleCancel(){
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}

