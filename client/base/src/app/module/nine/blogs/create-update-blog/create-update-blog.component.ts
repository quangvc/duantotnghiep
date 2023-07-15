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
      content: [null, Validators.required]
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
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }
      })

      this.subscription.add(obs);
    }
    // if( this.blogId ){
    //   let obs = this.blogsService.findOne(this.slug).subscribe({
    //     next: (res) => {
    //       this.formBlog.patchValue(res.data);
    //       console.log("detail: " + res)
    //     },
    //     error: (err) => {
    //       this.message.create(ERROR, err.error.message);
    //     }
    //   })
    //   this.subscription.add(obs);
    // }
  }

  onSelectFile(event: any) {

  }

  handleOk() {
    const formData = new FormData();
    if (this.formBlog.valid) {
      debugger;

      let file = $('#file').prop('files');
      console.log(this.formBlog)

      formData.append("user_id", this.formBlog.value.user_id);
      formData.append("title", this.formBlog.value.title);
      formData.append("slug", this.formBlog.value.slug);
      formData.append("content", this.formBlog.value.content);

      if(file.length > 0){
        formData.append("image", file[0]);
      }


      let createUpdate;

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
        createUpdate = this.blogsService.updateBlog(this.blogId, newData);
      }else{
        createUpdate = this.blogsService.createBlog(formData);
      }

      createUpdate.subscribe({
        next: (res) => {
          console.log(res)
          // this.closeModal.emit();
          // this.message.create(SUCCESS, `Thêm mới blog thành công.`)
        },
        error: (err) => {
          this.message.create(ERROR, err.error.message);
        }
      })

    }
  }

  // async handleOk() {

  //   if (this.formBlog.valid) {
  //     let id = this.blogId;
  //     let file = $('#file').prop('files');
  //     const formData = new FormData();

  //     if (id) {
  //       if (file) {
  //         formData.append('path', file[0]);
  //       }
  //       let update = this.blogsService.updateBlog(id,this.formBlog.value);
  //       let getImage:any[] = await firstValueFrom(this.blogsService.getImage());
  //       let findImage = getImage.find(x => x.blog_id == id)

  //       if(findImage){
  //         if (file) {
  //           await this.imagesService.updateImage(findImage.id,formData).subscribe({
  //             next: (res) => {},
  //             error: (err) => {
  //               this.message.create(ERROR, err.error.message);
  //             }
  //           })
  //         }
  //       }else{
  //         if (file) {
  //           await this.imagesService.addImage(id, formData).subscribe({
  //             next: (res) => {},
  //             error: (err) => {
  //               this.message.create(ERROR, err.error.message);
  //             },
  //           });
  //         }
  //       }

  //       await update.subscribe({
  //         next: (res) => {
  //           this.closeModal.emit();
  //           this.message.create(SUCCESS, `Cập nhật thành công!`);
  //         },
  //         error: (err) => {
  //           this.message.create(ERROR, err.error.message);
  //         }
  //       })
  //     }
  //   }
  // }


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
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}

