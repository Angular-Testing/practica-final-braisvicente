import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Launch } from 'src/app/models/launch';

@Component({
  selector: 'ab-launch-card',
  template: `
    <aside *ngIf="launch">
      <h3>
        <a [routerLink]="['/launch/' + launch.slug]"> {{ launch.name }}</a>
      </h3>

      <time>
        <h4 class="{{ launch.status.name | lowercase }}">
          {{ launch.net | date: 'dd/MM/yyyy HH:mm:ss Z' }}
        </h4>
      </time>

      <ab-location [launch]="launch"></ab-location>
      <ab-mission [launch]="launch"></ab-mission>
      <ab-service-provider [launch]="launch"></ab-service-provider>
      <button *ngIf="allowAddToFavorites" (click)="onClicAddToFavorites()">
        Add to favorites 🤍
      </button>
      <button *ngIf="allowRemoveFromFavorites" (click)="onClicRemoveFromFavorites()">
        Remove from favorites 💔
      </button>
    </aside>
  `,
  styles: [
    `
      .success {
        color: #3ad29f;
      }
      .failure {
        color: #f73454;
      }
      .tbd {
        color: #aaa;
      }
      .go {
        color: #3ad29f;
      }
    `,
  ],
})
export class LaunchCardComponent implements OnInit {
  @Input() launch!: Launch;
  @Input() allowAddToFavorites = false;
  @Input() allowRemoveFromFavorites = false;
  @Output() addToFavorites = new EventEmitter<string>();
  @Output() removeFromFavorites = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  onClicAddToFavorites(): void {
    this.addToFavorites.emit(this.launch.slug);
  }
  onClicRemoveFromFavorites(): void {
    this.removeFromFavorites.emit(this.launch.slug);
  }
}
