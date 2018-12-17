import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompteMySuffix } from 'app/shared/model/compte-my-suffix.model';

@Component({
    selector: 'jhi-compte-my-suffix-detail',
    templateUrl: './compte-my-suffix-detail.component.html'
})
export class CompteMySuffixDetailComponent implements OnInit {
    compte: ICompteMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ compte }) => {
            this.compte = compte;
        });
    }

    previousState() {
        window.history.back();
    }
}
