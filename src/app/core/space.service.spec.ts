import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SpaceService } from './space.service';
import { environment } from '../../environments/environment';

fdescribe('GIVEN the SpaceService isolated from remote server', () => {
  const remoteUrl = environment.rootUrl;
  let service: SpaceService;
  let controller: HttpTestingController;
  let inputBaseUrl: string;

  beforeEach(() => {
    //Arrange
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SpaceService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('WHEN getUpcomingLaunches$ is called', () => {
    beforeEach(() => {
      //Act
      const limit = 20;
      const modeList = 'mode=list';
      inputBaseUrl = `${remoteUrl}launch/upcoming/?limit=${limit}&${modeList}`;
      service.getUpcomingLaunches$(limit).subscribe();
    });
    it('THEN should call the right url', () => {
      // Assert
      const expected = inputBaseUrl;
      controller.expectOne(expected);
    });
  });

  afterEach(() => {
    // Asegura que ninguna petición se ha quedado sin controlar
    controller.verify();
  });
});
