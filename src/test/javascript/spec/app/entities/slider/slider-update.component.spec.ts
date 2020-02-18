import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JaworznoTestModule } from '../../../test.module';
import { SliderUpdateComponent } from 'app/entities/slider/slider-update.component';
import { SliderService } from 'app/entities/slider/slider.service';
import { Slider } from 'app/shared/model/slider.model';

describe('Component Tests', () => {
  describe('Slider Management Update Component', () => {
    let comp: SliderUpdateComponent;
    let fixture: ComponentFixture<SliderUpdateComponent>;
    let service: SliderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JaworznoTestModule],
        declarations: [SliderUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SliderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SliderUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SliderService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Slider(123);
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
        const entity = new Slider();
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
