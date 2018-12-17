import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPayerTaxeMySuffix } from 'app/shared/model/payer-taxe-my-suffix.model';
import { Principal } from 'app/core';
import { PayerTaxeMySuffixService } from './payer-taxe-my-suffix.service';

@Component({
    selector: 'jhi-payer-taxe-my-suffix',
    templateUrl: './payer-taxe-my-suffix.component.html'
})
export class PayerTaxeMySuffixComponent implements OnInit, OnDestroy {
    payerTaxes: IPayerTaxeMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private payerTaxeService: PayerTaxeMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.payerTaxeService.query().subscribe(
            (res: HttpResponse<IPayerTaxeMySuffix[]>) => {
                this.payerTaxes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPayerTaxes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPayerTaxeMySuffix) {
        return item.id;
    }

    registerChangeInPayerTaxes() {
        this.eventSubscriber = this.eventManager.subscribe('payerTaxeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
