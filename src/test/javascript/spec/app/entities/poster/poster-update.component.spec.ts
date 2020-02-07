import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JaworznoTestModule } from '../../../test.module';
import { PosterUpdateComponent } from 'app/entities/poster/poster-update.component';
import { PosterService } from 'app/entities/poster/poster.service';
import { Poster } from 'app/shared/model/poster.model';

describe('Component Tests', () => {
  describe('Poster Management Update Component', () => {
    let comp: PosterUpdateComponent;
    let fixture: ComponentFixture<PosterUpdateComponent>;
    let service: PosterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JaworznoTestModule],
        declarations: [PosterUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PosterUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PosterUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PosterService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Poster(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Poster();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
