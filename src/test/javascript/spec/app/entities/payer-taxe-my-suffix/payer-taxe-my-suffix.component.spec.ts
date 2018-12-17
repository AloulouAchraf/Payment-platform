/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlockchainAppTestModule } from '../../../test.module';
import { PayerTaxeMySuffixComponent } from 'app/entities/payer-taxe-my-suffix/payer-taxe-my-suffix.component';
import { PayerTaxeMySuffixService } from 'app/entities/payer-taxe-my-suffix/payer-taxe-my-suffix.service';
import { PayerTaxeMySuffix } from 'app/shared/model/payer-taxe-my-suffix.model';

describe('Component Tests', () => {
    describe('PayerTaxeMySuffix Management Component', () => {
        let comp: PayerTaxeMySuffixComponent;
        let fixture: ComponentFixture<PayerTaxeMySuffixComponent>;
        let service: PayerTaxeMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlockchainAppTestModule],
                declarations: [PayerTaxeMySuffixComponent],
                providers: []
            })
                .overrideTemplate(PayerTaxeMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PayerTaxeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PayerTaxeMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PayerTaxeMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.payerTaxes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
