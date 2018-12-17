/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { BlockchainAppTestModule } from '../../../test.module';
import { CompteMySuffixUpdateComponent } from 'app/entities/compte-my-suffix/compte-my-suffix-update.component';
import { CompteMySuffixService } from 'app/entities/compte-my-suffix/compte-my-suffix.service';
import { CompteMySuffix } from 'app/shared/model/compte-my-suffix.model';

describe('Component Tests', () => {
    describe('CompteMySuffix Management Update Component', () => {
        let comp: CompteMySuffixUpdateComponent;
        let fixture: ComponentFixture<CompteMySuffixUpdateComponent>;
        let service: CompteMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlockchainAppTestModule],
                declarations: [CompteMySuffixUpdateComponent]
            })
                .overrideTemplate(CompteMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompteMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompteMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CompteMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.compte = entity;
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
                    const entity = new CompteMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.compte = entity;
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
