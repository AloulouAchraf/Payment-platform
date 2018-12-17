import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPayerTaxeMySuffix } from 'app/shared/model/payer-taxe-my-suffix.model';
import { PayerTaxeMySuffixService } from './payer-taxe-my-suffix.service';
import { ICompteMySuffix } from 'app/shared/model/compte-my-suffix.model';
import { CompteMySuffixService } from 'app/entities/compte-my-suffix';
import { ITaxeMySuffix } from 'app/shared/model/taxe-my-suffix.model';
import { TaxeMySuffixService } from 'app/entities/taxe-my-suffix';

@Component({
    selector: 'jhi-payer-taxe-my-suffix-update',
    templateUrl: './payer-taxe-my-suffix-update.component.html'
})
export class PayerTaxeMySuffixUpdateComponent implements OnInit {
    private _payerTaxe: IPayerTaxeMySuffix;
    isSaving: boolean;

    comptes: ICompteMySuffix[];

    taxes: ITaxeMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private payerTaxeService: PayerTaxeMySuffixService,
        private compteService: CompteMySuffixService,
        private taxeService: TaxeMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ payerTaxe }) => {
            this.payerTaxe = payerTaxe;
        });
        this.compteService.query().subscribe(
            (res: HttpResponse<ICompteMySuffix[]>) => {
                this.comptes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.taxeService.query().subscribe(
            (res: HttpResponse<ITaxeMySuffix[]>) => {
                this.taxes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.payerTaxe.id !== undefined) {
            this.subscribeToSaveResponse(this.payerTaxeService.update(this.payerTaxe));
        } else {
            this.subscribeToSaveResponse(this.payerTaxeService.create(this.payerTaxe));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPayerTaxeMySuffix>>) {
        result.subscribe((res: HttpResponse<IPayerTaxeMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCompteById(index: number, item: ICompteMySuffix) {
        return item.id;
    }

    trackTaxeById(index: number, item: ITaxeMySuffix) {
        return item.id;
    }
    get payerTaxe() {
        return this._payerTaxe;
    }

    set payerTaxe(payerTaxe: IPayerTaxeMySuffix) {
        this._payerTaxe = payerTaxe;
    }
}
