import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BlockchainAppCompteMySuffixModule } from './compte-my-suffix/compte-my-suffix.module';
import { BlockchainAppTaxeMySuffixModule } from './taxe-my-suffix/taxe-my-suffix.module';
import { BlockchainAppPayerTaxeMySuffixModule } from './payer-taxe-my-suffix/payer-taxe-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        BlockchainAppCompteMySuffixModule,
        BlockchainAppTaxeMySuffixModule,
        BlockchainAppPayerTaxeMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlockchainAppEntityModule {}
