import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JaworznoTestModule } from '../../../test.module';
import { PosterComponent } from 'app/entities/poster/poster.component';
import { PosterService } from 'app/entities/poster/poster.service';
import { Poster } from 'app/shared/model/poster.model';

describe('Component Tests', () => {
  describe('Poster Management Component', () => {
    let comp: PosterComponent;
    let fixture: ComponentFixture<PosterComponent>;
    let service: PosterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JaworznoTestModule],
        declarations: [PosterComponent]
      })
        .overrideTemplate(PosterComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PosterComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PosterService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Poster(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.posters && comp.posters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
