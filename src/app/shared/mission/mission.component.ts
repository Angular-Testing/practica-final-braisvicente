import { Component, Input, OnInit } from '@angular/core';
import { Launch } from 'src/app/models/launch';

@Component({
  selector: 'ab-mission',
  template: `
    <div *ngIf="launch.mission != null">
      <div *ngIf="launch.mission.description != null">
        <h5>{{ launch.mission.name }}</h5>
        {{ launch.mission.description }}
      </div>
      <div *ngIf="launch.mission.description == null">
        <b>{{ launch.mission }}</b>
      </div>
    </div>
    <div>
      <h5>{{ launch.mission_type || launch.mission?.type || 'Unknown details' }}</h5>
    </div>
    <div *ngIf="launch.failreason">
      <h5 class="fail-reason">Fail Reason:</h5>
      {{ launch.failreason }}
    </div>
  `,
  styles: [
    `
      .fail-reason {
        color: #f73454;
      }
    `,
  ],
})
export class MissionComponent implements OnInit {
  @Input() launch!: Launch;
  constructor() {}

  ngOnInit(): void {}
}
