import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITaxeMySuffix } from 'app/shared/model/taxe-my-suffix.model';

type EntityResponseType = HttpResponse<ITaxeMySuffix>;
type EntityArrayResponseType = HttpResponse<ITaxeMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TaxeMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/taxes';

    constructor(private http: HttpClient) {}

    create(taxe: ITaxeMySuffix): Observable<EntityResponseType> {
        return this.http.post<ITaxeMySuffix>(this.resourceUrl, taxe, { observe: 'response' });
    }

    update(taxe: ITaxeMySuffix): Observable<EntityResponseType> {
        return this.http.put<ITaxeMySuffix>(this.resourceUrl, taxe, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITaxeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITaxeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
