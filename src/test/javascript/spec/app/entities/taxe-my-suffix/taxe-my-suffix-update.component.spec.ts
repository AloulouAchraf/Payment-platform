/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BlockchainAppTestModule } from '../../../test.module';
import { TaxeMySuffixUpdateComponent } from 'app/entities/taxe-my-suffix/taxe-my-suffix-update.component';
import { TaxeMySuffixService } from 'app/entities/taxe-my-suffix/taxe-my-suffix.service';
import { TaxeMySuffix } from 'app/shared/model/taxe-my-suffix.model';

describe('Component Tests', () => {
    describe('TaxeMySuffix Management Update Component', () => {
        let comp: TaxeMySuffixUpdateComponent;
        let fixture: ComponentFixture<TaxeMySuffixUpdateComponent>;
        let service: TaxeMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlockchainAppTestModule],
                declarations: [TaxeMySuffixUpdateComponent]
            })
                .overrideTemplate(TaxeMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaxeMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxeMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TaxeMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.taxe = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TaxeMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.taxe = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
