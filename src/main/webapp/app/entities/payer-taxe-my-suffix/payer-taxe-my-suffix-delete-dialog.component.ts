import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPayerTaxeMySuffix } from 'app/shared/model/payer-taxe-my-suffix.model';
import { PayerTaxeMySuffixService } from './payer-taxe-my-suffix.service';

@Component({
    selector: 'jhi-payer-taxe-my-suffix-delete-dialog',
    templateUrl: './payer-taxe-my-suffix-delete-dialog.component.html'
})
export class PayerTaxeMySuffixDeleteDialogComponent {
    payerTaxe: IPayerTaxeMySuffix;

    constructor(
        private payerTaxeService: PayerTaxeMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.payerTaxeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'payerTaxeListModification',
                content: 'Deleted an payerTaxe'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-payer-taxe-my-suffix-delete-popup',
    template: ''
})
export class PayerTaxeMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ payerTaxe }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PayerTaxeMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.payerTaxe = payerTaxe;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
