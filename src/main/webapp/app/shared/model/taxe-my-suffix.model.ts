export interface ITaxeMySuffix {
    id?: number;
    montantTaxe?: number;
    description?: string;
    userLogin?: string;
    userId?: number;
}

export class TaxeMySuffix implements ITaxeMySuffix {
    constructor(
        public id?: number,
        public montantTaxe?: number,
        public description?: string,
        public userLogin?: string,
        public userId?: number
    ) {}
}
