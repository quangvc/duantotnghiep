import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription, firstValueFrom } from 'rxjs';
import { ERROR } from 'src/app/module/_mShared/model/url.class';
import { StatisticService } from 'src/app/module/_mShared/service/statistic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  data: any;
  data2: any;

  options: any;
  options2: any;

  statisticalByUser: any;
  statisticalByLastMonthRevenue:any;
  statisticalLastMonthCountRooms:any;

  validateForm!: FormGroup;

  constructor(
    private statisticService: StatisticService,
    private message: NzMessageService,
    private fb: FormBuilder
  ){}

  ngOnInit() {
    this.createFormFilter();
    this.getChart();
    this.getChartY(null,null);
    this.getStatisticalByUser();
    this.getStatisticalByLastMonthRevenue();
    this.getStatisticalLastMonthCountRooms();
  }

  private createFormFilter(){
    this.validateForm = this.fb.group({
      dateFrom: [Date.now()],
      dateTo: [Date.now()]
    })
  }

  async getChart(){

    let getStatisticalByMonth = await firstValueFrom(this.statisticService.statisticalByMonth());
    let getStatisticalByRoom = await firstValueFrom(this.statisticService.statisticalByRoom());

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
                'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
                'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
          {
              label: 'Doanh thu hàng tháng',
              backgroundColor: documentStyle.getPropertyValue('--pink-500'),
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              data: [
                getStatisticalByMonth.Jan,
                getStatisticalByMonth.Feb,
                getStatisticalByMonth.Mar,
                getStatisticalByMonth.Apr,
                getStatisticalByMonth.May,
                getStatisticalByMonth.Jun,
                getStatisticalByMonth.Jul,
                getStatisticalByMonth.Aug,
                getStatisticalByMonth.Sep,
                getStatisticalByMonth.Oct,
                getStatisticalByMonth.Nov,
                getStatisticalByMonth.Dec,
              ]
          },
          {
            label: 'Doanh thu số phòng cho thuê hàng tháng',
            backgroundColor: documentStyle.getPropertyValue('--blue-500'),
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            data: [
                getStatisticalByRoom.Jan,
                getStatisticalByRoom.Feb,
                getStatisticalByRoom.Mar,
                getStatisticalByRoom.Apr,
                getStatisticalByRoom.May,
                getStatisticalByRoom.Jun,
                getStatisticalByRoom.Jul,
                getStatisticalByRoom.Aug,
                getStatisticalByRoom.Sep,
                getStatisticalByRoom.Oct,
                getStatisticalByRoom.Nov,
                getStatisticalByRoom.Dec,
            ]
          },

        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };
  }

  async getChartY(keys:any, values:any){



    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data2 = {
        labels: keys,
        datasets: [
            {
                label: 'Doanh thu theo ngày',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: values
            },
        ]
    };

    this.options2 = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
  }

  getStatisticalByDate(){
    // let obs = this.statisticService.statisticalByDate().subscribe({
    //   next: () => {

    //   },
    //   error: () => {

    //   }
    // })
  }
  // thống kê doanh thu hàng tháng
  getStatisticalByMonth(){
    let obs = this.statisticService.statisticalByMonth().subscribe({
      next: (res) => {
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })

    this.subscription.add(obs);
  }

  getStatisticalByRoom(){
    let obs = this.statisticService.statisticalByRoom().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })

    this.subscription.add(obs);
  }

  async getStatisticalByUser(){
    let x:any = await firstValueFrom(this.statisticService.statisticalByUser());
    this.statisticalByUser = x;
  }

  async getStatisticalByLastMonthRevenue(){
    let x:any = await firstValueFrom(this.statisticService.statisticalByLastMonthRevenue());
    this.statisticalByLastMonthRevenue = x;
  }

  async getStatisticalLastMonthCountRooms(){
    let x:any = await firstValueFrom(this.statisticService.statisticalLastMonthCountRooms());
    this.statisticalLastMonthCountRooms = x;
  }

  submitForm(){
    let dateFrom = moment(this.validateForm.value.dateFrom)?.format('YYYY-M-DD') || '';
    let dateTo = moment(this.validateForm.value.dateTo)?.format('YYYY-M-DD') || '';


    console.log(dateFrom ,dateTo)

    this.statisticService.statisticalByDate(dateFrom, dateTo).subscribe({
      next: (res) => {
        console.log(res)
        const propertyNames = Object.keys(res);
        const propertyValues = Object.values(res);
        this.getChartY(propertyNames,propertyValues);
      },
      error: (err) => {
        this.message.create(ERROR, err.error.message);
      }
    })
    // if()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
