//import { ActivityRecord } from './../../../../../backend/src/model/activity.record.entity';
import { Component, Input, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { NgFor, NgIf, formatDate, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';

import { RecordService } from '../../services/record.service';

@Component({
    selector: 'dialog-record',
    standalone: true,
    imports: [NgFor, NgIf, DialogModule, ButtonModule, CardModule, TagModule, PanelModule, AvatarModule],
    templateUrl: './activity-record.component.html',
    styleUrl: './activity-record.component.scss',
    providers: [
      {
        provide: DATE_PIPE_DEFAULT_OPTIONS,
        useValue: { dateFormat: "longDate" }
      }
    ],
})

export class DialogRecord implements OnInit {
  visible: boolean = false;
  title:string = "";
  records:any = [];
  dataRecords: any;
  @Input() activityId:Number = 0;

  constructor(
    private recordService:RecordService,
    @Inject(LOCALE_ID) public locale: string
  ){}

  ngOnInit() {
    this.recordService.getRecords(this.activityId).then(data => {
      this.dataRecords = data;

      for(let e of this.dataRecords.records){
        if(e.date != undefined){
        e.date = formatDate(e.date, 'dd-MM-yyyy HH:mm' ,this.locale);
        }
      };
      this.records = this.dataRecords.records;
    })
  }

  showDialog() {
      this.title = this.dataRecords.title + " - " + this.dataRecords.type;
      this.visible = true;
  }

}
