/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlockchainAppTestModule } from '../../../test.module';
import { PayerTaxeMySuffixDetailComponent } from 'app/entities/payer-taxe-my-suffix/payer-taxe-my-suffix-detail.component';
import { PayerTaxeMySuffix } from 'app/shared/model/payer-taxe-my-suffix.model';

describe('Component Tests', () => {
    describe('PayerTaxeMySuffix Management Detail Component', () => {
        let comp: PayerTaxeMySuffixDetailComponent;
        let fixture: ComponentFixture<PayerTaxeMySuffixDetailComponent>;
        const route = ({ data: of({ payerTaxe: new PayerTaxeMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlockchainAppTestModule],
                declarations: [PayerTaxeMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PayerTaxeMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PayerTaxeMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.payerTaxe).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
