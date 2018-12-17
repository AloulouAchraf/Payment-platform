import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaxeMySuffix } from 'app/shared/model/taxe-my-suffix.model';
import { TaxeMySuffixService } from './taxe-my-suffix.service';

@Component({
    selector: 'jhi-taxe-my-suffix-delete-dialog',
    templateUrl: './taxe-my-suffix-delete-dialog.component.html'
})
export class TaxeMySuffixDeleteDialogComponent {
    taxe: ITaxeMySuffix;

    constructor(private taxeService: TaxeMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taxeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'taxeListModification',
                content: 'Deleted an taxe'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-taxe-my-suffix-delete-popup',
    template: ''
})
export class TaxeMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ taxe }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TaxeMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.taxe = taxe;
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
