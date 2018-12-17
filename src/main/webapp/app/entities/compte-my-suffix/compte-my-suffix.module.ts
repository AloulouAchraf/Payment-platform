import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlockchainAppSharedModule } from 'app/shared';
import { BlockchainAppAdminModule } from 'app/admin/admin.module';
import {
    CompteMySuffixComponent,
    CompteMySuffixDetailComponent,
    CompteMySuffixUpdateComponent,
    CompteMySuffixDeletePopupComponent,
    CompteMySuffixDeleteDialogComponent,
    compteRoute,
    comptePopupRoute
} from './';

const ENTITY_STATES = [...compteRoute, ...comptePopupRoute];

@NgModule({
    imports: [BlockchainAppSharedModule, BlockchainAppAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompteMySuffixComponent,
        CompteMySuffixDetailComponent,
        CompteMySuffixUpdateComponent,
        CompteMySuffixDeleteDialogComponent,
        CompteMySuffixDeletePopupComponent
    ],
    entryComponents: [
        CompteMySuffixComponent,
        CompteMySuffixUpdateComponent,
        CompteMySuffixDeleteDialogComponent,
        CompteMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlockchainAppCompteMySuffixModule {}
