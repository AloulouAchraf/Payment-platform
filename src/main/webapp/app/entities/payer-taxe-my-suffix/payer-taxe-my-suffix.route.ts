import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PayerTaxeMySuffix } from 'app/shared/model/payer-taxe-my-suffix.model';
import { PayerTaxeMySuffixService } from './payer-taxe-my-suffix.service';
import { PayerTaxeMySuffixComponent } from './payer-taxe-my-suffix.component';
import { PayerTaxeMySuffixDetailComponent } from './payer-taxe-my-suffix-detail.component';
import { PayerTaxeMySuffixUpdateComponent } from './payer-taxe-my-suffix-update.component';
import { PayerTaxeMySuffixDeletePopupComponent } from './payer-taxe-my-suffix-delete-dialog.component';
import { IPayerTaxeMySuffix } from 'app/shared/model/payer-taxe-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PayerTaxeMySuffixResolve implements Resolve<IPayerTaxeMySuffix> {
    constructor(private service: PayerTaxeMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((payerTaxe: HttpResponse<PayerTaxeMySuffix>) => payerTaxe.body));
        }
        return of(new PayerTaxeMySuffix());
    }
}

export const payerTaxeRoute: Routes = [
    {
        path: 'payer-taxe-my-suffix',
        component: PayerTaxeMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.payerTaxe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payer-taxe-my-suffix/:id/view',
        component: PayerTaxeMySuffixDetailComponent,
        resolve: {
            payerTaxe: PayerTaxeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.payerTaxe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payer-taxe-my-suffix/new',
        component: PayerTaxeMySuffixUpdateComponent,
        resolve: {
            payerTaxe: PayerTaxeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.payerTaxe.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'payer-taxe-my-suffix/:id/edit',
        component: PayerTaxeMySuffixUpdateComponent,
        resolve: {
            payerTaxe: PayerTaxeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.payerTaxe.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const payerTaxePopupRoute: Routes = [
    {
        path: 'payer-taxe-my-suffix/:id/delete',
        component: PayerTaxeMySuffixDeletePopupComponent,
        resolve: {
            payerTaxe: PayerTaxeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.payerTaxe.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
