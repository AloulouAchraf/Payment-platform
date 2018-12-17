/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlockchainAppTestModule } from '../../../test.module';
import { CompteMySuffixDetailComponent } from 'app/entities/compte-my-suffix/compte-my-suffix-detail.component';
import { CompteMySuffix } from 'app/shared/model/compte-my-suffix.model';

describe('Component Tests', () => {
    describe('CompteMySuffix Management Detail Component', () => {
        let comp: CompteMySuffixDetailComponent;
        let fixture: ComponentFixture<CompteMySuffixDetailComponent>;
        const route = ({ data: of({ compte: new CompteMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BlockchainAppTestModule],
                declarations: [CompteMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompteMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompteMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.compte).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
