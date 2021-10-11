import { Component, Input, OnInit } from '@angular/core';
import { Launch } from 'src/app/models/launch';

@Component({
  selector: 'ab-location',
  template: `
    <address>
      <p *ngIf="launch.location">
        <i> {{ launch.location }}</i>
        <i> {{ launch.pad }}</i>
      </p>
      <p *ngIf="!launch.location">
        <i> {{ launch.pad.location.name }}</i>
        <i> {{ launch.pad.name }}</i>
      </p>
    </address>
  `,
  styles: [],
})
export class LocationComponent implements OnInit {
  @Input() launch!: Launch;

  constructor() {}

  ngOnInit(): void {}
}
