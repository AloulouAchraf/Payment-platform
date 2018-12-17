import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompteMySuffix } from 'app/shared/model/compte-my-suffix.model';
import { CompteMySuffixService } from './compte-my-suffix.service';

@Component({
    selector: 'jhi-compte-my-suffix-delete-dialog',
    templateUrl: './compte-my-suffix-delete-dialog.component.html'
})
export class CompteMySuffixDeleteDialogComponent {
    compte: ICompteMySuffix;

    constructor(private compteService: CompteMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.compteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'compteListModification',
                content: 'Deleted an compte'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-compte-my-suffix-delete-popup',
    template: ''
})
export class CompteMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ compte }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompteMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.compte = compte;
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
