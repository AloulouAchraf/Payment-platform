import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompteMySuffix } from 'app/shared/model/compte-my-suffix.model';
import { CompteMySuffixService } from './compte-my-suffix.service';
import { CompteMySuffixComponent } from './compte-my-suffix.component';
import { CompteMySuffixDetailComponent } from './compte-my-suffix-detail.component';
import { CompteMySuffixUpdateComponent } from './compte-my-suffix-update.component';
import { CompteMySuffixDeletePopupComponent } from './compte-my-suffix-delete-dialog.component';
import { ICompteMySuffix } from 'app/shared/model/compte-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CompteMySuffixResolve implements Resolve<ICompteMySuffix> {
    constructor(private service: CompteMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((compte: HttpResponse<CompteMySuffix>) => compte.body));
        }
        return of(new CompteMySuffix());
    }
}

export const compteRoute: Routes = [
    {
        path: 'compte-my-suffix',
        component: CompteMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'blockchainApp.compte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'compte-my-suffix/:id/view',
        component: CompteMySuffixDetailComponent,
        resolve: {
            compte: CompteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.compte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'compte-my-suffix/new',
        component: CompteMySuffixUpdateComponent,
        resolve: {
            compte: CompteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.compte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'compte-my-suffix/:id/edit',
        component: CompteMySuffixUpdateComponent,
        resolve: {
            compte: CompteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.compte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const comptePopupRoute: Routes = [
    {
        path: 'compte-my-suffix/:id/delete',
        component: CompteMySuffixDeletePopupComponent,
        resolve: {
            compte: CompteMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blockchainApp.compte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
