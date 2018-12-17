/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlockchainAppTestModule } from '../../../test.module';
import { TaxeMySuffixDetailComponent } from 'app/entities/taxe-my-suffix/taxe-my-suffix-detail.component';
import { TaxeMySuffix } from 'app/shared/model/taxe-my-suffix.model';

describe('Component Tests', () => {
    describe('TaxeMySuffix Management Detail Component', () => {
        let comp: TaxeMySuffixDetailComponent;
        let fixture: ComponentFixture<TaxeMySuffixDetailComponent>;
        const route = ({ data: of({ taxe: new TaxeMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlockchainAppTestModule],
                declarations: [TaxeMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TaxeMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaxeMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.taxe).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
