import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITaxeMySuffix } from 'app/shared/model/taxe-my-suffix.model';
import { TaxeMySuffixService } from './taxe-my-suffix.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-taxe-my-suffix-update',
    templateUrl: './taxe-my-suffix-update.component.html'
})
export class TaxeMySuffixUpdateComponent implements OnInit {
    private _taxe: ITaxeMySuffix;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private taxeService: TaxeMySuffixService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ taxe }) => {
            this.taxe = taxe;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.taxe.id !== undefined) {
            this.subscribeToSaveResponse(this.taxeService.update(this.taxe));
        } else {
            this.subscribeToSaveResponse(this.taxeService.create(this.taxe));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITaxeMySuffix>>) {
        result.subscribe((res: HttpResponse<ITaxeMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get taxe() {
        return this._taxe;
    }

    set taxe(taxe: ITaxeMySuffix) {
        this._taxe = taxe;
    }
}
