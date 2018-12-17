import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPayerTaxeMySuffix } from 'app/shared/model/payer-taxe-my-suffix.model';

type EntityResponseType = HttpResponse<IPayerTaxeMySuffix>;
type EntityArrayResponseType = HttpResponse<IPayerTaxeMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PayerTaxeMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/payer-taxes';

    constructor(private http: HttpClient) {}

    create(payerTaxe: IPayerTaxeMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPayerTaxeMySuffix>(this.resourceUrl, payerTaxe, { observe: 'response' });
    }

    update(payerTaxe: IPayerTaxeMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPayerTaxeMySuffix>(this.resourceUrl, payerTaxe, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPayerTaxeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPayerTaxeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
