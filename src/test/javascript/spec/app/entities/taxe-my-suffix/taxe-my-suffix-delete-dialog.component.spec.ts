/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BlockchainAppTestModule } from '../../../test.module';
import { TaxeMySuffixDeleteDialogComponent } from 'app/entities/taxe-my-suffix/taxe-my-suffix-delete-dialog.component';
import { TaxeMySuffixService } from 'app/entities/taxe-my-suffix/taxe-my-suffix.service';

describe('Component Tests', () => {
    describe('TaxeMySuffix Management Delete Component', () => {
        let comp: TaxeMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TaxeMySuffixDeleteDialogComponent>;
        let service: TaxeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlockchainAppTestModule],
                declarations: [TaxeMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(TaxeMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaxeMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaxeMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
