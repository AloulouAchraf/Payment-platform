export interface IPayerTaxeMySuffix {
    id?: number;
    compteRib?: string;
    compteId?: number;
    taxeDescription?: string;
    taxeId?: number;
}

export class PayerTaxeMySuffix implements IPayerTaxeMySuffix {
    constructor(
        public id?: number,
        public compteRib?: string,
        public compteId?: number,
        public taxeDescription?: string,
        public taxeId?: number
    ) {}
}
