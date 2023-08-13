import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../_mShared/service/support.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ERROR, SUCCESS } from '../../_mShared/model/url.class';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(
    private supportService: SupportService,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  supports: any[] = []

  confirmModal?: NzModalRef;


  ngOnInit() {
    this.getSupports();
  }

  getSupports(){
    this.supportService.getSupport().subscribe({
      next: (res) => {
        this.supports = res.data;
        this.supports = this.supports.reverse();
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

  confirmChangeStatus(data:any){
    this.confirmModal = this.modal.confirm({
      nzTitle: `Cảnh báo thay đổi ${data.name} ?`,
      nzContent: `Xác thực cập nhật hỗ trợ ${data.name}`,
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.changeStatus(data);
          setTimeout(0.6 > 0.5 ? resolve : reject, 1000);
        }).catch()
    });
  }

  changeStatus(data:any){
    this.supportService.changeStatus(data.id).subscribe({
      next: (res) => {
        this.message.create(SUCCESS, `Cập nhật ${data.name} thành công.`)
        this.getSupports();
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
  }

}
