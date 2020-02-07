import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JaworznoTestModule } from '../../../test.module';
import { PictureComponent } from 'app/entities/picture/picture.component';
import { PictureService } from 'app/entities/picture/picture.service';
import { Picture } from 'app/shared/model/picture.model';

describe('Component Tests', () => {
  describe('Picture Management Component', () => {
    let comp: PictureComponent;
    let fixture: ComponentFixture<PictureComponent>;
    let service: PictureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JaworznoTestModule],
        declarations: [PictureComponent]
      })
        .overrideTemplate(PictureComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PictureComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PictureService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Picture(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pictures && comp.pictures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
