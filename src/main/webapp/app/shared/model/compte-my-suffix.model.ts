export interface ICompteMySuffix {
    id?: number;
    rib?: string;
    password?: string;
    userId?: number;
}

export class CompteMySuffix implements ICompteMySuffix {
    constructor(public id?: number, public rib?: string, public password?: string, public userId?: number) {}
}
