import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlockchainAppSharedModule } from 'app/shared';
import { BlockchainAppAdminModule } from 'app/admin/admin.module';
import {
    TaxeMySuffixComponent,
    TaxeMySuffixDetailComponent,
    TaxeMySuffixUpdateComponent,
    TaxeMySuffixDeletePopupComponent,
    TaxeMySuffixDeleteDialogComponent,
    taxeRoute,
    taxePopupRoute
} from './';

const ENTITY_STATES = [...taxeRoute, ...taxePopupRoute];

@NgModule({
    imports: [BlockchainAppSharedModule, BlockchainAppAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TaxeMySuffixComponent,
        TaxeMySuffixDetailComponent,
        TaxeMySuffixUpdateComponent,
        TaxeMySuffixDeleteDialogComponent,
        TaxeMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TaxeMySuffixComponent,
        TaxeMySuffixUpdateComponent,
        TaxeMySuffixDeleteDialogComponent,
        TaxeMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlockchainAppTaxeMySuffixModule {}
