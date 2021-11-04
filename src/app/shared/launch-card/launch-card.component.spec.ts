import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchCardComponent } from './launch-card.component';
import { Launch } from '../../models/launch';
import { DatePipe } from '@angular/common';
import { NEW_LAUNCH } from '../../../../tests/assets/new-launch';
import { findNativeEl, getTextContent } from '../../../../tests/utils.spec';
import { RouterTestingModule } from '@angular/router/testing';

describe('LaunchCardComponent', () => {
  let component: LaunchCardComponent;
  let fixture: ComponentFixture<LaunchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaunchCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `<ab-launch-card
    [launch]="launch"
    [allowAddToFavorites]="true"
    [allowRemoveFromFavorites]="true"
    (addToFavorites)="onAddToFavorites($event)"
    (removeFromFavorites)="onRemoveFromFavorites($event)"
  ></ab-launch-card>`,
})
class LaunchCardHostComponent {
  public launch!: Launch;
  public allowAddToFavorites = false;
  public allowRemoveFromFavorites = false;
  constructor() {}
  public onAddToFavorites(action: string) {}
  public onRemoveFromFavorites(action: string) {}
}

fdescribe('GIVEN the LaunchCardComponent on a Host component', () => {
  let hostComponent: LaunchCardHostComponent;
  let hostFixture: ComponentFixture<LaunchCardHostComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LaunchCardComponent,
        LaunchCardHostComponent,
      ],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(LaunchCardHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  describe('WHEN receives an input launch', () => {
    beforeEach(() => {
      // Act
      hostComponent.launch = NEW_LAUNCH;
      hostFixture.detectChanges();
    });
    it('THEN should display launch name', () => {
      // Assert
      const actual = getTextContent(hostFixture, 'aside h3 a');
      const expected = hostComponent.launch.name;
      expect(actual).toEqual(expected);
    });
    it('THEN should display time in format dd/MM/yyyy HH:mm:ss Z', () => {
      // Assert
      const actual = getTextContent(hostFixture, 'aside time h4');
      const expected = String(
        new DatePipe('en').transform(hostComponent.launch.net, 'dd/MM/yyyy HH:mm:ss Z'),
      );
      expect(actual).toEqual(expected);
    });
    it('THEN should display ab-location', () => {
      // Assert
      const actual: HTMLElement | null = findNativeEl(hostFixture, 'aside ab-location');
      expect(actual).toBeTruthy();
    });
    it('THEN should display ab-mission', () => {
      // Assert
      const actual: HTMLElement | null = findNativeEl(hostFixture, 'aside ab-mission');
      expect(actual).toBeTruthy();
    });
    it('THEN should display ab-service-provider', () => {
      // Assert
      const actual: HTMLElement | null = findNativeEl(hostFixture, 'aside ab-service-provider');
      expect(actual).toBeTruthy();
    });
    it('THEN should display button add favorites', () => {
      // Assert
      const actual = getTextContent(hostFixture, '[data-testid="addToFavorites-button"]');
      const expected = 'Add to favorites 🤍';
      expect(actual).toEqual(expected);
    });
    it('THEN should display button remove favorites', () => {
      // Assert
      const actual = getTextContent(hostFixture, '[data-testid="removeFromFavorites-button"]');
      const expected = 'Remove from favorites 💔';
      expect(actual).toEqual(expected);
    });
  });

  describe('WHEN not receives an input launch', () => {
    it('THEN should display empty template', () => {
      // Assert
      const actual: HTMLElement | null = findNativeEl(hostFixture, 'ab-launch-card > *');
      expect(actual).toBeNull();
    });
  });

  describe('WHEN users clicks on a add Favorites button', () => {
    beforeEach(() => {
      // Arrange
      spyOn(hostComponent, 'onAddToFavorites');
      hostComponent.launch = NEW_LAUNCH;
      hostFixture.detectChanges();
      // Act
      hostFixture.nativeElement.querySelector('[data-testid="addToFavorites-button"]').click();
    });
    it('THEN host component call method onAddToFavorites with right params', () => {
      // Assert
      expect(hostComponent.onAddToFavorites).toHaveBeenCalledWith(hostComponent.launch.slug);
    });
  });

  describe('WHEN users clicks on a remove Favorites button', () => {
    beforeEach(() => {
      // Arrange
      spyOn(hostComponent, 'onRemoveFromFavorites');
      hostComponent.launch = NEW_LAUNCH;
      hostFixture.detectChanges();
      // Act
      hostFixture.nativeElement.querySelector('[data-testid="removeFromFavorites-button"]').click();
    });
    it('THEN should emit the event removeFromFavorites with right params', () => {
      // Assert
      expect(hostComponent.onRemoveFromFavorites).toHaveBeenCalledWith(hostComponent.launch.slug);
    });
  });
});
