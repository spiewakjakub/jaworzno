import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JaworznoTestModule } from '../../../test.module';
import { PlaceComponent } from 'app/entities/place/place.component';
import { PlaceService } from 'app/entities/place/place.service';
import { Place } from 'app/shared/model/place.model';

describe('Component Tests', () => {
  describe('Place Management Component', () => {
    let comp: PlaceComponent;
    let fixture: ComponentFixture<PlaceComponent>;
    let service: PlaceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JaworznoTestModule],
        declarations: [PlaceComponent]
      })
        .overrideTemplate(PlaceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Place(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.places && comp.places[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
