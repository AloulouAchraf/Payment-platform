/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BlockchainAppTestModule } from '../../../test.module';
import { PayerTaxeMySuffixDeleteDialogComponent } from 'app/entities/payer-taxe-my-suffix/payer-taxe-my-suffix-delete-dialog.component';
import { PayerTaxeMySuffixService } from 'app/entities/payer-taxe-my-suffix/payer-taxe-my-suffix.service';

describe('Component Tests', () => {
    describe('PayerTaxeMySuffix Management Delete Component', () => {
        let comp: PayerTaxeMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PayerTaxeMySuffixDeleteDialogComponent>;
        let service: PayerTaxeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlockchainAppTestModule],
                declarations: [PayerTaxeMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PayerTaxeMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PayerTaxeMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PayerTaxeMySuffixService);
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
