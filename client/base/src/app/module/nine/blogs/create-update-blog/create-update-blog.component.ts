import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, firstValueFrom } from 'rxjs';
import { ERROR, SUCCESS } from 'src/app/module/_mShared/model/url.class';
import { UserService } from 'src/app/module/_mShared/service/user.service';
import { BlogsService } from 'src/app/module/_mShared/service/blogs.service';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { ImagesService } from './../../../_mShared/service/images.service';

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
  // @Input() slug: any;
  @Input() displayCreateUpdateBlog: boolean = false;
  @Output() closeModal = new EventEmitter<any>();
  title: string;
  content: string
  image: string;
  user_id: number;
  slug: string

  formBlog!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogsService: BlogsService,
    private usersService: UserService,
    private imagesService: ImagesService,
    private message: NzMessageService,
    private i18n: NzI18nService
  ) { }

  users: any[] = [];

  ngOnInit() {
    this.createFormBuildBlog();
    this.getUsers();
    this.getValueFormUpdate();
  }

  private createFormBuildBlog(){
    this.formBlog = this.fb.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      image: [null],
      user_id: [null],
      slug: [null]
    })
  }

  getUsers(){
    let obs = this.usersService.getUsers().subscribe({
      next: (user) => {
        this.users = user.data;
        console.log(user)
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })

    this.subscription.add(obs);
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getValueFormUpdate(){
    debugger
    if( this.blogId ){
      let obs = this.blogsService.findOne(this.slug).subscribe({
        next: (res) => {
          this.formBlog.patchValue(res.data);
          console.log("detail: " + res)
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }
      })
      this.subscription.add(obs);
    }
  }

  async onSelectFile(event: any) {
    const formData = new FormData();
    if (event.target.files.length > 0) {
      let file: any = await event.target.files[0];
    } else {
    }
  }

  async handleOk() {

    if (this.formBlog.valid) {
debugger
      let id = this.blogId;
      let file = $('#file').prop('files');
      const formData = new FormData();

      if (id) {
        if (file) {
          formData.append('path', file[0]);
        }
        let update = this.blogsService.updateBlog(id,this.formBlog.value);
        let getImage:any[] = await firstValueFrom(this.blogsService.getImage());
        let findImage = getImage.find(x => x.blog_id == id)

        if(findImage){
          if (file) {
            await this.imagesService.updateImage(findImage.id,formData).subscribe({
              next: (res) => {},
              error: (err) => {
                this.message.create(ERROR, err.error.message);
              }
            })
          }
        }else{
          if (file) {
            await this.imagesService.addImage(id, formData).subscribe({
              next: (res) => {},
              error: (err) => {
                this.message.create(ERROR, err.error.message);
              },
            });
          }
        }

        await update.subscribe({
          next: (res) => {
            this.closeModal.emit();
            this.message.create(SUCCESS, `Cập nhật thành công!`);
          },
          error: (err) => {
            this.message.create(ERROR, err.error.message);
          }
        })
      }
    }
  }


  // handleOk(){
  //   if(this.formBlog.valid){
  //     let id = this.blogId;
  //     let newData = {
  //       title: this.formBlog.value.title,
  //       content: this.formBlog.value.content,
  //       image: this.formBlog.value.image,
  //       user_id: this.formBlog.value.user_id,
  //       slug: this.formBlog.value.slug,
  //     }
  //     let formData = new FormData();

  //     formData.append('title', this.formBlog.value.title);
  //     formData.append('content', this.formBlog.value.content);
  //     formData.append('image', this.formBlog.value.image);
  //     formData.append('user_id', this.formBlog.value.user_id);
  //     formData.append('slug', this.formBlog.value.slug);

  //     let createUpdate = this.blogsService.createBlog(formData);

  //     if(id){
  //       createUpdate = this.blogsService.updateBlog(id,newData);
  //     }
  //     createUpdate.subscribe({
  //       next: (cou:any) => {
  //         console.log(cou);
  //         this.closeModal.emit();
  //         this.message.create(SUCCESS, `${id ? "Cập nhật" : "Thêm mới"} thành công`);
  //       },
  //       error: (err:any) => {
  //         this.message.create(ERROR, err.error.message);
  //         console.log(err);
  //       }
  //     })
  //   }
  // }

  // resetForm() {
  //   this.title = '';
  //   this.content = ''
  //   this.image = '';
  //   this.user_id = null as any;
  //   this.slug = '';
  // }


  handleCancel(){
    this.closeModal.emit();
    // this.resetForm()
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();

  }
}

