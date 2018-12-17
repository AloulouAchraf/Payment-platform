import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompteMySuffix } from 'app/shared/model/compte-my-suffix.model';
import { CompteMySuffixService } from './compte-my-suffix.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-compte-my-suffix-update',
    templateUrl: './compte-my-suffix-update.component.html'
})
export class CompteMySuffixUpdateComponent implements OnInit {
    private _compte: ICompteMySuffix;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private compteService: CompteMySuffixService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ compte }) => {
            this.compte = compte;
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
        if (this.compte.id !== undefined) {
            this.subscribeToSaveResponse(this.compteService.update(this.compte));
        } else {
            this.subscribeToSaveResponse(this.compteService.create(this.compte));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompteMySuffix>>) {
        result.subscribe((res: HttpResponse<ICompteMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get compte() {
        return this._compte;
    }

    set compte(compte: ICompteMySuffix) {
        this._compte = compte;
    }
}
