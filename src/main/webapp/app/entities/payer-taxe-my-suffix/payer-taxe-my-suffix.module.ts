import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlockchainAppSharedModule } from 'app/shared';
import {
    PayerTaxeMySuffixComponent,
    PayerTaxeMySuffixDetailComponent,
    PayerTaxeMySuffixUpdateComponent,
    PayerTaxeMySuffixDeletePopupComponent,
    PayerTaxeMySuffixDeleteDialogComponent,
    payerTaxeRoute,
    payerTaxePopupRoute
} from './';

const ENTITY_STATES = [...payerTaxeRoute, ...payerTaxePopupRoute];

@NgModule({
    imports: [BlockchainAppSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PayerTaxeMySuffixComponent,
        PayerTaxeMySuffixDetailComponent,
        PayerTaxeMySuffixUpdateComponent,
        PayerTaxeMySuffixDeleteDialogComponent,
        PayerTaxeMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PayerTaxeMySuffixComponent,
        PayerTaxeMySuffixUpdateComponent,
        PayerTaxeMySuffixDeleteDialogComponent,
        PayerTaxeMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlockchainAppPayerTaxeMySuffixModule {}
