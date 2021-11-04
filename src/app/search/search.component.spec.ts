import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { findNativeEl, findDebugEl, findNativeElValue } from '../../../tests/utils.spec';
import { SpaceService } from '../core/space.service';
import { Launch } from '../models/launch';
import { Observable, of } from 'rxjs';
import { NEW_LAUNCH } from '../../../tests/assets/new-launch';

fdescribe('GIVEN the Search Component Form', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  //Espía
  type submitMethod = { getSearchedLaunches$: Observable<Launch[]> };
  let spaceServiceSpy: jasmine.SpyObj<submitMethod>;

  //Utilidades formulario
  const inputTermValue = 'Término test';
  const inputNumberLaunchValue = 50;

  const termSelector = '#searchTerm';
  const numberLaunchSelector = '#numberOfLaunches';
  const submitSelector = 'button[type="submit"]';

  beforeEach(async () => {
    // Arrange
    spaceServiceSpy = jasmine.createSpyObj<submitMethod>('SpaceService', {
      getSearchedLaunches$: of(NEW_LAUNCH),
    });

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
      providers: [{ provide: SpaceService, useValue: spaceServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    //Act
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('THEN should create', () => {
    //Assert
    expect(component).toBeTruthy();
  });

  describe('WHEN onInit', () => {
    it('THEN call getSearchedLaunches$ with right params one time', fakeAsync(() => {
      //Assert
      component.ngOnInit();
      const expected = {
        searchTerm: component.queryParams.searchTerm,
        limit: component.queryParams.limit,
      };
      expect(spaceServiceSpy.getSearchedLaunches$).toHaveBeenCalledOnceWith(expected);
    }));
  });

  describe('WHEN form start', () => {
    beforeEach(async(() => {
      //Act
      fixture.detectChanges();
    }));
    it('THEN have default search term value', fakeAsync(() => {
      // Assert
      const actual = findNativeElValue(fixture, termSelector);
      const expected = fixture.componentInstance.queryParams.searchTerm;
      expect(actual).toEqual(expected);
    }));
    it('THEN have default numberOfLaunches value', fakeAsync(() => {
      // Assert
      const actual = findNativeElValue(fixture, numberLaunchSelector);
      const expected = fixture.componentInstance.queryParams.limit;
      expect(Number(actual)).toEqual(expected);
    }));
  });

  describe('WHEN inputs change', () => {
    beforeEach(async(() => {
      // Act
      fixture.detectChanges();
    }));
    it('THEN searchTerm ngModel change', fakeAsync(() => {
      // Assert
      const actual = findDebugEl(fixture, termSelector);
      actual.value = inputTermValue;
      actual.dispatchEvent(new Event('input'));
      const expected = fixture.componentInstance.queryParams.searchTerm;
      expect(actual.value).toEqual(expected);
    }));
    it('THEN numberOfLaunches ngModel change', fakeAsync(() => {
      // Assert
      const actual = findDebugEl(fixture, numberLaunchSelector);
      actual.value = inputNumberLaunchValue;
      actual.dispatchEvent(new Event('input'));
      const expected = fixture.componentInstance.queryParams.limit;
      expect(Number(actual.value)).toEqual(expected);
    }));
  });

  describe('WHEN user click submit btn with default form values', () => {
    //Act
    beforeEach(async(() => {
      const submitButton = findNativeEl(fixture, submitSelector);
      submitButton?.click();
    }));
    it('THEN should call the getSearchedLaunches$ method with correctly args one time', fakeAsync(() => {
      // //Assert
      const expected = { searchTerm: component.queryParams.searchTerm, limit: component.queryParams.limit };
      expect(spaceServiceSpy.getSearchedLaunches$).toHaveBeenCalledOnceWith(expected);
    }));
  });

  describe('WHEN user click submit btn after values form change', () => {
    //Act
    beforeEach(async(() => {
      component.queryParams.searchTerm = inputTermValue;
      component.queryParams.limit = inputNumberLaunchValue;
      const submitButton = findNativeEl(fixture, submitSelector);
      submitButton?.click();
    }));
    it('THEN should call the getSearchedLaunches$ method with correctly args one time', fakeAsync(() => {
      // //Assert
      const expected = { searchTerm: inputTermValue, limit: inputNumberLaunchValue };
      expect(spaceServiceSpy.getSearchedLaunches$).toHaveBeenCalledOnceWith(expected);
    }));
  });
});
