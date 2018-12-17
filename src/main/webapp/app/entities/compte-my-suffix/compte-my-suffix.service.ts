import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompteMySuffix } from 'app/shared/model/compte-my-suffix.model';

type EntityResponseType = HttpResponse<ICompteMySuffix>;
type EntityArrayResponseType = HttpResponse<ICompteMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CompteMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/comptes';

    constructor(private http: HttpClient) {}

    create(compte: ICompteMySuffix): Observable<EntityResponseType> {
        return this.http.post<ICompteMySuffix>(this.resourceUrl, compte, { observe: 'response' });
    }

    update(compte: ICompteMySuffix): Observable<EntityResponseType> {
        return this.http.put<ICompteMySuffix>(this.resourceUrl, compte, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompteMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompteMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
