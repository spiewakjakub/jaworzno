import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { JaworznoTestModule } from '../../../test.module';
import { SponsorDetailComponent } from 'app/entities/sponsor/sponsor-detail.component';
import { Sponsor } from 'app/shared/model/sponsor.model';

describe('Component Tests', () => {
  describe('Sponsor Management Detail Component', () => {
    let comp: SponsorDetailComponent;
    let fixture: ComponentFixture<SponsorDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ sponsor: new Sponsor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JaworznoTestModule],
        declarations: [SponsorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SponsorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SponsorDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load sponsor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sponsor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
