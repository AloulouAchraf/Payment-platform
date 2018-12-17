import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaxeMySuffix } from 'app/shared/model/taxe-my-suffix.model';
import { TaxeMySuffixService } from './taxe-my-suffix.service';
import { TaxeMySuffixComponent } from './taxe-my-suffix.component';
import { TaxeMySuffixDetailComponent } from './taxe-my-suffix-detail.component';
import { TaxeMySuffixUpdateComponent } from './taxe-my-suffix-update.component';
import { TaxeMySuffixDeletePopupComponent } from './taxe-my-suffix-delete-dialog.component';
import { ITaxeMySuffix } from 'app/shared/model/taxe-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TaxeMySuffixResolve implements Resolve<ITaxeMySuffix> {
    constructor(private service: TaxeMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((taxe: HttpResponse<TaxeMySuffix>) => taxe.body));
        }
        return of(new TaxeMySuffix());
    }
}

export const taxeRoute: Routes = [
    {
        path: 'taxe-my-suffix',
        component: TaxeMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'blockchainApp.taxe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'taxe-my-suffix/:id/view',
        component: TaxeMySuffixDetailComponent,
        resolve: {
            taxe: TaxeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.taxe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'taxe-my-suffix/new',
        component: TaxeMySuffixUpdateComponent,
        resolve: {
            taxe: TaxeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.taxe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'taxe-my-suffix/:id/edit',
        component: TaxeMySuffixUpdateComponent,
        resolve: {
            taxe: TaxeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.taxe.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taxePopupRoute: Routes = [
    {
        path: 'taxe-my-suffix/:id/delete',
        component: TaxeMySuffixDeletePopupComponent,
        resolve: {
            taxe: TaxeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.taxe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
