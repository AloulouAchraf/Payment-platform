import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPayerTaxeMySuffix } from 'app/shared/model/payer-taxe-my-suffix.model';

@Component({
    selector: 'jhi-payer-taxe-my-suffix-detail',
    templateUrl: './payer-taxe-my-suffix-detail.component.html'
})
export class PayerTaxeMySuffixDetailComponent implements OnInit {
    payerTaxe: IPayerTaxeMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ payerTaxe }) => {
            this.payerTaxe = payerTaxe;
        });
    }

    previousState() {
        window.history.back();
    }
}
