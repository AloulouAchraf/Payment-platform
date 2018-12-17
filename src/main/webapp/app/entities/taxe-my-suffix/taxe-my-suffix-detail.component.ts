import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaxeMySuffix } from 'app/shared/model/taxe-my-suffix.model';

@Component({
    selector: 'jhi-taxe-my-suffix-detail',
    templateUrl: './taxe-my-suffix-detail.component.html'
})
export class TaxeMySuffixDetailComponent implements OnInit {
    taxe: ITaxeMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ taxe }) => {
            this.taxe = taxe;
        });
    }

    previousState() {
        window.history.back();
    }
}
